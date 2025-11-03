
export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  priceAtPurchase: number;
  imageUrl?: string;
}
export interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}
export interface PaymentInfo {
  method: "COD" | "Card";
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  nameOnCard?: string;
}
