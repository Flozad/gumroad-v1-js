import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
  linkId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
}

const PurchaseSchema: Schema = new Schema({
  linkId: { type: Schema.Types.ObjectId, required: true, ref: 'Link' },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);
