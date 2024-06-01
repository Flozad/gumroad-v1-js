import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import Link from '../../../models/Link';
import User from '../../../models/User';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { linkId } = req.query;
    const { card_number, expiry_month, expiry_year, card_security_code } = req.body;

    // Here you would normally process the payment using a payment gateway
    // For this example, we'll just simulate a successful payment

    await connectDB();

    try {
      // Find the link by ID
      const link = await Link.findById(linkId);
      if (!link) {
        return res.status(404).json({ success: false, error_message: 'Link not found' });
      }

      // Update the link's download and paid download counts
      link.number_of_downloads += 1;
      link.number_of_paid_downloads += 1;
      await link.save();

      // Find the owner of the link
      const user = await User.findById(link.owner);
      if (!user) {
        return res.status(404).json({ success: false, error_message: 'User not found' });
      }

      // Update the user's balance
      user.balance += link.price;
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        redirect_url: '/', // Redirect to a success page or download link
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error_message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
