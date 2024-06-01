import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import User from '../../models/User';
import Link from '../../models/Link';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'POST') {
    const { card_number, expiry_month, expiry_year, card_security_code, linkId } = req.body;

    /* if (!card_number || !expiry_month || !expiry_year || !card_security_code || !linkId) {
      return res.status(400).json({ success: false, error_message: 'Please fill in all the fields' });
    } */

    // Find the link
    const link = await Link.findById(linkId);
    if (!link) {
      return res.status(404).json({ success: false, error_message: 'Link not found' });
    }

    // Find the owner of the link
    const user = await User.findById(link.owner);
    if (!user) {
      return res.status(404).json({ success: false, error_message: 'User not found' });
    }

    const paymentAmount = link.price;

    user.balance += paymentAmount;
    link.number_of_paid_downloads += 1;
    link.number_of_downloads += 1;

    await user.save();
    await link.save();

    return res.status(200).json({ success: true, redirect_url: `/success?linkId=${linkId}` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
