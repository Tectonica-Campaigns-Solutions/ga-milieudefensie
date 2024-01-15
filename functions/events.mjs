import axios from 'axios';

// CSL Auth
const clientId = 'Uh8AtWkWrvAj2rqJvigssfIXQdCENL570DWZlaaWSxE';
const clientSecret = 'b6Fw4d7NTzloS35IKCrckb9zdfiT5VWUbIAeXBn3_kQ';

export default async () => {
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

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

    return new Response(JSON.stringify({ events: [{ prop: true, list: events }] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error here' }));
  }
};
