import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import fetch from 'node-fetch';
import env from 'dotenv';

env.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const formData = new FormData();
    formData.append('file', req.body.file);
    try {
      const response = await fetch('https://file.io/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.FILE_BEARER_TOKEN}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        res.status(response.status).json(await response.json());
      }
    } catch (error) {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;