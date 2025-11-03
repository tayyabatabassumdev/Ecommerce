export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  category: string[];
  subcategory?: string;
  brand: string;
  images: string[];
  thumbnail: string;
  basePrice: number;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  tags: string[];
  status: 'active' | 'inactive' | 'out_of_stock' | 'discontinued';
  isFeatured: boolean;
  totalStock: number;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
}
export interface ProductVariant {
  _id: string;
  size?: string;
  color?: string;
  sku: string;
  price: number;
  stock: number;
  sold: number;
  images?: string[];
}
export interface AdminOrder {
  _id: string;
  orderNumber: string;
  customer: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'placed' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  isGuestOrder: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId?: string;
  variantDetails?: {
    size?: string;
    color?: string;
  };
  quantity: number;
  price: number;
  total: number;
}
export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface PaymentMethod {
  type: 'card' | 'bank' | 'cod';
  last4?: string;
  brand?: string;
}
export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  wishlistCount: number;
  status: 'active' | 'suspended' | 'deleted';
  joinedAt: string;
  lastLogin?: string;
}
export interface Coupon {
  _id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  userUsageLimit?: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  applicableCategories?: string[];
  applicableProducts?: string[];
  createdBy: string;
  createdAt: string;
}
export interface Review {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReturnRequest {
  _id: string;
  orderId: string;
  orderNumber: string;
  userId?: string;
  userName: string;
  userEmail: string;
  items: ReturnItem[];
  reason: string;
  description: string;
  images?: string[];
  refundAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReturnItem {
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
}
export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  pendingReviews: number;
  pendingReturns: number;
  lowStockProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  salesData: SalesDataPoint[];
  topProducts: TopProduct[];
  recentOrders: AdminOrder[];
}
export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}
export interface TopProduct {
  productId: string;
  name: string;
  image: string;
  sold: number;
  revenue: number;
}
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  productCount: number;
  isActive: boolean;
  order: number;
  createdAt: string;
}
