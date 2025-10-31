import { Types, Document } from "mongoose";
import { IProduct } from "./product.interface";

export interface IPopulatedCartItem extends Document {
  _id: Types.ObjectId;
  product: IProduct; 
  variantId?: Types.ObjectId;
  quantity: number;
  priceAtAdd: number;
}

export interface IPopulatedCart extends Document {
  user: Types.ObjectId;
  items: IPopulatedCartItem[];
}
