
export interface Variant {
  _id?: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  basePrice: number;
  images: string[];
  variants: Variant[];
  averageRating?: number;
  numReviews?: number;
  createdAt: string;
  updatedAt: string;
}
