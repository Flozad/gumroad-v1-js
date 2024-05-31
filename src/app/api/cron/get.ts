import { NextApiRequest, NextApiResponse } from 'next';

// Dummy data for cron entries
const cronEntries = [
  { cron_entry: 'Sample Cron Job', next_run: '2024-05-31 10:00:00', key: '1' },
  // Add more cron entries here
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ cron_entries: cronEntries });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
