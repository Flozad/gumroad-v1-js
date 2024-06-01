import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import Link from '../../../models/Link';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const links = await Link.find({ owner: userId });
      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
