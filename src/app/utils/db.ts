import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const urlMongo = process.env.MONGODB_URI;

const connectDB = async () => {
  console.log('Connecting to MongoDB');
  console.log('urlMongo', urlMongo)
  if (!urlMongo) {
    throw new Error('MONGODB_URI is not set in the environment variables');
  }

  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(urlMongo);
};

export default connectDB;
