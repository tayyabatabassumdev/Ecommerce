import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
const StripeCheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-intent`,
        {
          amount,
        }
      );
      const { clientSecret } = data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });
      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed, please try again.");
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded-lg bg-gray-50" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        {loading ? "Processing..." : `Pay Rs. ${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
