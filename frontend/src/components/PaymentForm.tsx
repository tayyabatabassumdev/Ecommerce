// src/components/PaymentForm.tsx
import React, { useState } from "react";
import type { PaymentInfo } from "../types/checkout";

interface Props {
  onChange: (payment: PaymentInfo) => void;
}

const PaymentForm: React.FC<Props> = ({ onChange }) => {
  const [payment, setPayment] = useState<PaymentInfo>({ method: "COD" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...payment, [name]: value };
    setPayment(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

      <div className="space-y-4">
        <select
          name="method"
          value={payment.method}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        {payment.method === "Card" && (
          <>
            <input
              type="text"
              name="nameOnCard"
              placeholder="Name on Card"
              className="border p-3 rounded-lg w-full"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className="border p-3 rounded-lg w-full"
              required
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                className="border p-3 rounded-lg"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                className="border p-3 rounded-lg"
                required
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
