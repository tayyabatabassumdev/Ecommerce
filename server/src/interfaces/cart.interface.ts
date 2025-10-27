import { Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  variantId?: Types.ObjectId | null;
  quantity: number;
  priceAtAdd: number;
}

export interface ICart {
  user?: Types.ObjectId | null;
  items: ICartItem[];
}
