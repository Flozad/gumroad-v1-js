import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
    _id: string;
    owner: string;
    amount: number;
    date: Date;
}

const PurchaseSchema: Schema = new Schema({
    owner: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);