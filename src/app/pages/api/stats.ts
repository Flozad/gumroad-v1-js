import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import Link from '../../models/Link';
import User from '../../models/User';
import Purchase from '../../models/Purchase';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const numberOfLinks = await Link.countDocuments({});
      const numberOfUsers = await User.countDocuments({});
      const purchases = await Purchase.find({});
      const numberOfPurchases = purchases.length;
      const purchaseTotal = purchases.reduce((sum, p) => sum + p.amount, 0);
      const numberOfViews = 2;
      const numberOfDownloads = 3;
      const lastLinkDate = 4;
      const lastPurchaseDate = 5;

      res.status(200).json({
        numberOfLinks,
        numberOfUsers,
        purchaseTotal,
        numberOfPurchases,
        numberOfViews,
        numberOfDownloads,
        lastLinkDate,
        lastPurchaseDate,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
