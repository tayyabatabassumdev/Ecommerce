import { Document } from "mongoose";

export interface ITerm extends Document {
  title: string;
  content: string;
  type: "terms" | "privacy" | "refund"; // easily extensible
  lastUpdated: Date;
}
