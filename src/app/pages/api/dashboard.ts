import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/db';
import DashboardData from '../../models/DashboardData';
import { getUserId } from '../../utils/auth';
import Purchase from '../../models/Purchase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  try {
    const data = await DashboardData.findOne();
    if (!data) {
      return res.status(404).json({ message: 'No dashboard data found for user' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};

export const calculateTotals = async () => {
    const purchases = await Purchase.find();
    const purchaseTotal = purchases.reduce((total, purchase) => total + purchase.price, 0);

    return { purchaseTotal };
}


export default handler;
