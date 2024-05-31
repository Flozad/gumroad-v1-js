import mongoose from 'mongoose';

const urlMongo = process.env.MONGODB_URI;

const connectDB = async () => {
    const urlMongo = process.env.MONGODB_URI;

    if (!urlMongo) {
      throw new Error('MONGODB_URI is not set in the environment variables');
    }

    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(urlMongo);
  }

export default connectDB;
