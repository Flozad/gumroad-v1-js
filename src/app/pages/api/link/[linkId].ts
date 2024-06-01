import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import Link from '../../../models/Link';
import User from '../../../models/User';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { linkId } = req.query;

  if (req.method === 'GET') {
    try {
      const link = await Link.findById(linkId);
      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }
      res.status(200).json(link);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
