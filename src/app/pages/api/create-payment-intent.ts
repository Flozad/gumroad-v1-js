import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import connectDB from '../../utils/db';
import User from '../../models/User';
import Link from '../../models/Link';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-04-10',
});

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'POST') {
    const { linkId } = req.body;

    if (!linkId) {
      return res.status(400).json({ success: false, error_message: 'Link ID is required' });
    }

    const link = await Link.findById(linkId);
    if (!link) {
      return res.status(404).json({ success: false, error_message: 'Link not found' });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: link.price * 100,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' },
      });

      // Send paymentIntent client_secret to frontend
      return res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
      return res.status(500).json({ success: false, error_message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
