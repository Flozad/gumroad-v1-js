import { NextApiRequest, NextApiResponse } from 'next';

let cronEntries = [
  { cron_entry: 'Sample Cron Job', next_run: '2024-05-31 10:00:00', key: '1' },
  // Add more cron entries here
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { action, cron_entry, key } = req.body;

    if (action === 'Add' && cron_entry) {
      const newEntry = {
        cron_entry,
        next_run: new Date().toISOString(), // Example next run time
        key: (cronEntries.length + 1).toString()
      };
      cronEntries.push(newEntry);
    } else if (action === 'Delete' && key) {
      cronEntries = cronEntries.filter(entry => entry.key !== key);
    }

    res.status(200).json({ cron_entries: cronEntries });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
