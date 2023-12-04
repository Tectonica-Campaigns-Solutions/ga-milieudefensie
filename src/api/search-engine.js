import { buildClient } from '@datocms/cma-client-node';

export default async function handler(req, res) {
  console.log(req.body);

  try {
    const data = [];
    const client = buildClient({ apiToken: process.env.DATO_API_TOKEN });

    for await (const searchResult of client.searchResults.listPagedIterator({
      filter: {
        fuzzy: true,
        query: req.body?.message ?? '',
        locale: 'en',
      },
    })) {
      console.log(searchResult);
      data.push(searchResult);
    }

    res.status(200).json({ items: data });
  } catch (error) {
    console.error(error);
    res.status(200).json({ items: [] });
  }
}
