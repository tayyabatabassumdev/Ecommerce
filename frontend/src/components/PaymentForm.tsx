import React, { useState, useMemo } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import StripePayment from "./StripePayment";
const PaymentForm: React.FC = () => {
  const [method, setMethod] = useState<"COD" | "Card">("COD");
  const [cardData, setCardData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const { items } = useCartStore();
  const total = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.priceAtAdd * item.quantity,
      0
    );
    const shipping = subtotal > 5000 ? 0 : 300;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  }, [items]);
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Payment Method
      </h3>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setMethod("COD")}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition ${
            method === "COD"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Wallet className="w-4 h-4" /> COD
        </button>
        <button
          type="button"
          onClick={() => setMethod("Card")}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition ${
            method === "Card"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <CreditCard className="w-4 h-4" /> Card
        </button>
      </div>
      {method === "Card" && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Name on Card
            </label>
            <input
              type="text"
              name="nameOnCard"
              value={cardData.nameOnCard}
              onChange={handleCardChange}
              placeholder="John Doe"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Expiry
              </label>
              <input
                type="text"
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
                placeholder="MM/YY"
                maxLength={5}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                placeholder="***"
                maxLength={3}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <StripePayment amount={total} />
          </div>
        </div>
      )}
      {method === "COD" && (
        <div className="p-4 bg-gray-50 rounded-lg text-gray-600">
          <p>
            {" "}
            You’ll pay <b>Rs. {total.toFixed(2)}</b> in cash upon delivery.
          </p>
        </div>
      )}
    </div>
  );
};
export default PaymentForm;
