import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import Link from '../../models/Link';
import { v4 as uuidv4 } from 'uuid';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { owner, name, url, preview_url, description, price, download_limit } = req.body;

    if (!owner || !name || !url || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const unique_permalink = uuidv4();
      const newLink = new Link({
        owner,
        name,
        unique_permalink,
        url,
        preview_url,
        description,
        price,
        download_limit,
      });

      await newLink.save();

      res.status(201).json({ message: 'Link created successfully', link: newLink });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
