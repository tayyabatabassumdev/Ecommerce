import React, { useState, useMemo} from "react";
import { Wallet } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import type { PaymentInfo } from "../types/checkout";

interface PaymentFormProps {
  onChange: (payment: PaymentInfo) => void; 
}
const PaymentForm: React.FC<PaymentFormProps> = () => {
  const [method, setMethod] = useState<"COD">("COD");
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

      </div>

    
      {method === "COD" && (
        <div className="p-4 bg-gray-50 rounded-lg text-gray-600">
          <p>
            You’ll pay <b>Rs. {total.toFixed(2)}</b> in cash upon delivery.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
