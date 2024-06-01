import cron from 'node-cron';
import connectDB from './db';
import User from '../models/User';
import { calculateTotals } from '../pages/api/dashboard';

connectDB();

const updateUsers = async () => {
  try {
    const users = await User.find();
    const totals = await calculateTotals();

    for (const user of users) {
      user.balance = totals.purchaseTotal; // Update user balance based on your logic
      await user.save();
    }

    console.log('User balances updated successfully');
  } catch (error) {
    console.error('Error updating user balances:', error);
  }
};

// Schedule tasks to be run on the server.
cron.schedule('0 0 * * *', async () => {
  console.log('Running a daily cron job to update user balances');
  await updateUsers();
});
