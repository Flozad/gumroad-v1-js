import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../utils/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.url) {
        return res.status(400).json({ message: 'Reset hash is required' });
    }

    const reset_hash = req.url.split('/').pop();


  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email, reset_hash });
    if (!user) {
      return res.status(404).json({ message: 'Invalid reset link or user not found' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.reset_hash = undefined; // Clear the reset hash after successful reset
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export default handler;
