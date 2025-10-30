// src/pages/CheckoutPage.tsx
import React, { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummary from "../components/OrderSummary";
import type { CartItem, Address, PaymentInfo } from "../types/checkout";
import axios from "axios";

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get("/api/cart");
      setCartItems(data.items || []);
    };
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
  const shipping = 200; // example
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!address || !payment) return alert("Please fill all details");

    setLoading(true);
    try {
      const { data } = await axios.post("/api/orders", {
        items: cartItems,
        shippingInfo: address,
        paymentMethod: payment.method,
      });
      alert(`Order placed! Order ID: ${data.data.orderId}`);
      setLoading(false);
      // optional: redirect to confirmation page
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    alert(err.response?.data?.message || "Something went wrong");
  } else {
    alert("Something went wrong");
  }}
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
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
          <button
            disabled={loading}
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
