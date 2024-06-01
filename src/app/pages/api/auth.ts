import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import User from '../../models/User';
import connectDB from '../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Fill in the form please!' });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'That email is already taken, sorry!' });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return res.status(200).json({ message: 'User created successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
