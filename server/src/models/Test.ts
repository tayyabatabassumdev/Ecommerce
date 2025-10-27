import mongoose, { Schema, Document } from "mongoose";

export interface ITest extends Document {
  message: string;
  createdAt: Date;
}

const testSchema = new Schema<ITest>({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITest>("Test", testSchema);
