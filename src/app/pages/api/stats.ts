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

      const links = await Link.find({});
      const numberOfViews = links.reduce((sum, link) => sum + (link.number_of_views || 0), 0);
      const numberOfDownloads = links.reduce((sum, link) => sum + (link.number_of_downloads || 0), 0);

      const lastLink = await Link.findOne({}).sort({ create_date: -1 });
      const lastLinkDate = lastLink ? lastLink.create_date : null;

      const lastPurchase = await Purchase.findOne({}).sort({ date: -1 });
      const lastPurchaseDate = lastPurchase ? lastPurchase.date : null;

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
