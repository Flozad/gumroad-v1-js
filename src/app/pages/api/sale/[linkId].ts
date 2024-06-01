import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import Purchase from '../../../models/Purchase';
import Link from '../../../models/Link';
import User from '../../../models/User';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { linkId } = req.query;

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { card_number, expiry_month, expiry_year, card_security_code } = req.body;

  // Simulating a successful payment for this example
  const paymentSuccess = true;

  if (paymentSuccess) {
    try {
      const link = await Link.findById(linkId);
      if (!link) {
        return res.status(404).json({ success: false, message: 'Link not found' });
      }

      const userId = link.owner;
      const amount = link.price;

      const purchase = new Purchase({
        linkId,
        userId,
        amount,
      });

      await purchase.save();

      // Update user balance
      const user = await User.findById(userId);
      if (user) {
        user.balance += amount;
        await user.save();

        // Send email to the user
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: user.email,
          subject: 'New Purchase Made',
          html: `<p>Dear ${user.name},</p>
                 <p>Congratulations! You have made a new sale for $${amount}.</p>
                 <p>Thank you for using our service.</p>
                 <p>Best regards,</p>
                 <p>Gumroad</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }

      res.status(200).json({ success: true, message: 'Payment successful', redirect_url: `/success?linkId=${linkId}&userId=${userId}&amount=${amount}` });
    } catch (error) {
      console.error('Error processing sale:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error });
    }
  } else {
    res.status(400).json({ success: false, message: 'Payment failed' });
  }
};

export default handler;
