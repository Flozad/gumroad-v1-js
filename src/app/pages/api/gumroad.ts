import type { NextApiRequest, NextApiResponse } from 'next';

const gumroadApiUrl = 'http://www.gumroad.com/api/create';

async function curlPost(url: string, postData: any) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(postData).toString(),
  });

  return response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, url, description, price } = req.body;
    const options = { email: process.env.GUMROAD_EMAIL, password: process.env.GUMROAD_PASSWORD };

    if (!options.email || !options.password) {
      return res.status(400).json({ status: 'error', message: 'Email or password is missing' });
    }

    const fields = { name, url, description, price, ...options };
    const result = await curlPost(gumroadApiUrl, fields);

    if (result.status === 'success' && result.url) {
      return res.status(200).json({ status: 'success', url: result.url });
    } else {
      return res.status(500).json({ status: 'error', message: 'Failed to create product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
