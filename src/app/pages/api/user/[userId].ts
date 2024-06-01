import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import User from '../../../models/User';
import Link from '../../../models/Link';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (req.method === 'GET') {
    const { type } = req.query;

    if (type === 'links') {
      try {
        const links = await Link.find({ owner: userId });
        res.status(200).json(links);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else if (req.method === 'PUT') {
    const { name, email, payment_address } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.payment_address = payment_address || user.payment_address;

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
