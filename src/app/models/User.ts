import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  payment_address?: string;
  name?: string;
  password: string;
  reset_hash?: string;
  create_date: Date;
  balance: number;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  payment_address: { type: String },
  name: { type: String },
  password: { type: String, required: true },
  reset_hash: { type: String },
  create_date: { type: Date, default: Date.now },
  balance: { type: Number, default: 0.00 }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
