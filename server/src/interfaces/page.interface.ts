import { Document } from "mongoose";

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  lastUpdated: Date;
}
