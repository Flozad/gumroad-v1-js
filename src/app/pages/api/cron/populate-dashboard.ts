import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import DashboardData from '../../../models/DashboardData';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const { userId } = req.body;

  const fakeData = {
    userId,
    lastSevenDaysPurchaseTotal: 100,
    lastMonthPurchaseTotal: 400,
    purchaseTotal: 1000,
    numberOfDays: 7,
    chartNumbers: '10,20,30,40,50',
    chartMax: 100,
    showChart: true,
  };

  try {
    await DashboardData.findOneAndUpdate(
      { userId },
      fakeData,
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Dashboard data populated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error populating dashboard data', error });
  }
};

export default handler;
