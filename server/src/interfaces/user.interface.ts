import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;  // ✅ Add this line
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
