import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import User from '../../../models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetHash = crypto.randomBytes(20).toString('hex');
    user.reset_hash = resetHash;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${process.env.BASE_URL}/reset-password/${resetHash}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        return res.status(200).json({ success: true, message: 'Email sent' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export default handler;
