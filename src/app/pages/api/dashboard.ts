import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import Purchase from '../../models/Purchase';
import User from '../../models/User';
import moment from 'moment';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const purchases = await Purchase.find({ userId });

    if (!purchases.length) {
      return res.status(200).json({
        numberOfDays: 7,
        showChart: false,
        lastSevenDaysPurchaseTotal: 0,
        lastMonthPurchaseTotal: 0,
        purchaseTotal: 0,
        groupedPurchases: {},
        chartMax: 0
      });
    }

    const now = moment();
    const sevenDaysAgo = now.clone().subtract(7, 'days');
    const oneMonthAgo = now.clone().subtract(1, 'month');

    const purchaseTotal = purchases.reduce((acc, purchase) => acc + purchase.amount, 0);
    const lastSevenDaysPurchases = purchases.filter(purchase => moment(purchase.date).isAfter(sevenDaysAgo));
    const lastMonthPurchases = purchases.filter(purchase => moment(purchase.date).isAfter(oneMonthAgo));

    const lastSevenDaysPurchaseTotal = lastSevenDaysPurchases.reduce((acc, purchase) => acc + purchase.amount, 0);
    const lastMonthPurchaseTotal = lastMonthPurchases.reduce((acc, purchase) => acc + purchase.amount, 0);

    const groupedPurchases = purchases.reduce((acc, purchase) => {
      const date = moment(purchase.date).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + purchase.amount;
      return acc;
    }, {} as Record<string, number>);

    const chartNumbers = Object.values(groupedPurchases) as number[];
    const chartMax = Math.max(...chartNumbers);

    res.status(200).json({
      numberOfDays: 7,
      showChart: true,
      lastSevenDaysPurchaseTotal,
      lastMonthPurchaseTotal,
      purchaseTotal,
      groupedPurchases,
      chartMax
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export default handler;
