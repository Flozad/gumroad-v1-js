import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/db';
import Link from '../../../models/Link';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { linkId } = req.query;

  if (req.method === 'GET') {
    try {
      const link = await Link.findById(linkId);
      res.status(200).json(link);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else if (req.method === 'PUT') {
    const { name, price, url, previewUrl, description, downloadLimit } = req.body;

    try {
      const link = await Link.findByIdAndUpdate(
        linkId,
        {
          name,
          price,
          url,
          preview_url: previewUrl,
          description,
          download_limit: downloadLimit,
        },
        { new: true }
      );

      res.status(200).json(link);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Link.findByIdAndDelete(linkId);
      res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
