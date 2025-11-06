import React, { useState } from "react";
import AddressForm from "../../components/AddressForm";
import PaymentForm from "../../components/PaymentForm";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CheckoutActions from "./CheckoutActions";
import type { CartItem, Address, PaymentInfo } from "../../types/checkout";
import { placeOrder } from "../../services/orderService";
import { toast } from "react-hot-toast";
import axios from "axios";

const Checkout: React.FC = () => {
  const [cartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(false);

 const handlePlaceOrder = async () => {
  if (!address || !payment) return toast.error("Please fill all details");

  setLoading(true);
  try {
    const data = await placeOrder(cartItems, address, payment);
    toast.success(`Order placed! Order ID: ${data.data.orderId}`);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <AddressForm onChange={setAddress} />
          <PaymentForm onChange={setPayment} />
        </div>

        <div>
          <OrderSummary />
          <CheckoutActions loading={loading} onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
