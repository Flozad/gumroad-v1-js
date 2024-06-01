import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import User from '../../../models/User';
import connectDB from '../../../utils/db';
import jwt from 'jsonwebtoken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Fill in the form please!' });
    }

    await connectDB();

    const user = await User.findOne({ email });
    console.log('user', user);

    if (!user) {
      return res.status(400).json({ message: 'No user found with that email' });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    console.log('token', token);

    return res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
