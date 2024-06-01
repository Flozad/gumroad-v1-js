import { NextApiRequest, NextApiResponse } from 'next';
import Session from '../../utils/sessions';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = new Session(req, res);

  if (req.method === 'GET') {
    const sessionData = session.getAll();
    res.status(200).json(sessionData);
  } else if (req.method === 'POST') {
    const { key, value } = req.body;
    session.set(key, value);
    res.status(200).json({ message: 'Session updated' });
  } else if (req.method === 'DELETE') {
    const { key } = req.body;
    session.delete(key);
    res.status(200).json({ message: 'Session key deleted' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
