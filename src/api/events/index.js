const axios = require('axios');
const Base64 = require('base-64');

// CSL Auth
const clientId = 'Uh8AtWkWrvAj2rqJvigssfIXQdCENL570DWZlaaWSxE' || process.env.CSL_CLIENT_ID;
const clientSecret = 'b6Fw4d7NTzloS35IKCrckb9zdfiT5VWUbIAeXBn3_kQ' || process.env.CSL_CLIENT_SECRET;

export default async function handler(req, res) {
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = Base64.encode(credentials);

  const tokenResponse = await axios.post('https://klimaatmars.milieudefensie.nl/oauth/token', null, {
    headers: { Authorization: `Basic ${encodedCredentials}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    params: { grant_type: 'client_credentials' },
  });
  const accessToken = tokenResponse.data.access_token;

  // Events loop
  try {
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

    res.json({ events });
  } catch (error) {
    res.json({ events: [] });
  }
}
