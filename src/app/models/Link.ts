import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
  _id: string; // Add _id to the interface
  owner: string;
  name: string;
  unique_permalink: string;
  url: string;
  preview_url?: string;
  description?: string;
  price: number;
  create_date: Date;
  length_of_exclusivity: number;
  number_of_paid_downloads: number;
  number_of_downloads: number;
  download_limit: number;
  number_of_views: number;
  balance: number;
}

const LinkSchema: Schema = new Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  unique_permalink: { type: String, required: true },
  url: { type: String, required: true },
  preview_url: { type: String },
  description: { type: String },
  price: { type: Number, required: true, default: 1.00 },
  create_date: { type: Date, default: Date.now },
  length_of_exclusivity: { type: Number, default: 0 },
  number_of_paid_downloads: { type: Number, default: 0 },
  number_of_downloads: { type: Number, default: 0 },
  download_limit: { type: Number, default: 0 },
  number_of_views: { type: Number, default: 0 },
  balance: { type: Number, default: 0.00 }
});

export default mongoose.models.Link || mongoose.model<ILink>('Link', LinkSchema);
