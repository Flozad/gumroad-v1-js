import { NextApiRequest, NextApiResponse } from 'next';

// sample api call to test the api
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Hello from the API' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
