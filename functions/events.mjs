import axios from 'axios';
import fs from 'fs';
import path from 'path';

// CSL Auth
const clientId = 'Uh8AtWkWrvAj2rqJvigssfIXQdCENL570DWZlaaWSxE';
const clientSecret = 'b6Fw4d7NTzloS35IKCrckb9zdfiT5VWUbIAeXBn3_kQ';

const cacheFilePath = path.join(__dirname, 'cache.json');

export default async () => {
  try {
    const currentDate = new Date().getTime();
    let jsonContent = { date: null, events: [] };

    try {
      const fileContent = fs.readFileSync(cacheFilePath);
      jsonContent = JSON.parse(fileContent);

      if (jsonContent.date && currentDate - jsonContent.date < 5 * 60 * 1000) {
        return new Response(JSON.stringify(jsonContent), { status: 200 });
      }
    } catch (error) {
      console.error('Error al leer el archivo de caché:');
    }

    // Leer desde API
    console.log('Getting info from CSL API');

    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    const tokenResponse = await axios.post('https://klimaatmars.milieudefensie.nl/oauth/token', null, {
      headers: { Authorization: `Basic ${encodedCredentials}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { grant_type: 'client_credentials' },
    });
    const accessToken = tokenResponse.data.access_token;

    const initialEventsResponse = await axios.get(
      `https://klimaatmars.milieudefensie.nl/api/v1/events?page=1&access_token=${accessToken}`
    );

    let events = initialEventsResponse.data.events;
    let meta = initialEventsResponse.data.meta;

    while (meta.next_page) {
      const nextPageResponse = await axios.get(
        `https://klimaatmars.milieudefensie.nl/api/v1/events?page=${meta.next_page}&access_token=${accessToken}`
      );
      events = [...events, ...nextPageResponse.data.events];
      meta = nextPageResponse.data.meta;
    }

    try {
      jsonContent = { date: currentDate, events: [{ list: events }] };
      // fs.writeFileSync(cacheFilePath, JSON.stringify(jsonContent));
    } catch (error) {
      console.log('Error creating json file.', error);
    }

    return new Response(JSON.stringify(jsonContent), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error here' }));
  }
};