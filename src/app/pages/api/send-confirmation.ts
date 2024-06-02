import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import Link from '../../models/Link';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'POST') {
    const { linkId, amount, email } = req.body;

    // Validate inputs
    if (!linkId || !amount || !email) {
      return res.status(400).json({ message: 'Link ID, amount, and email are required' });
    }

    try {
      const link = await Link.findById(linkId);
      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Payment Confirmation',
        html: `<p>Thank you for your purchase of $${amount}.</p>
               <p>You can access your purchased content <a href="${link.url}">here</a>.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          return res.status(200).json({ success: true, message: 'Email sent', info });
        }
      });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
