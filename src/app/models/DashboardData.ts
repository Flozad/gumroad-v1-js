import mongoose, { Schema, Document } from 'mongoose';

export interface IDashboardData extends Document {
  userId: string;
  lastSevenDaysPurchaseTotal: number;
  lastMonthPurchaseTotal: number;
  purchaseTotal: number;
  numberOfDays: number;
  chartNumbers: string;
  chartMax: number;
  showChart: boolean;
}

const DashboardDataSchema: Schema = new Schema({
  userId: { type: String, required: true },
  lastSevenDaysPurchaseTotal: { type: Number, required: true },
  lastMonthPurchaseTotal: { type: Number, required: true },
  purchaseTotal: { type: Number, required: true },
  numberOfDays: { type: Number, required: true },
  chartNumbers: { type: String, required: true },
  chartMax: { type: Number, required: true },
  showChart: { type: Boolean, required: true },
});

const DashboardData = mongoose.models.DashboardData || mongoose.model<IDashboardData>('DashboardData', DashboardDataSchema);

export default DashboardData;
