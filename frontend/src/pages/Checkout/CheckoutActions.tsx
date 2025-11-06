import React from "react";

interface CheckoutActionsProps {
  loading: boolean;
  onPlaceOrder: () => void;
}

const CheckoutActions: React.FC<CheckoutActionsProps> = ({ loading, onPlaceOrder }) => (
  <button
    disabled={loading}
    onClick={onPlaceOrder}
    className="w-full mt-6 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
  >
    {loading ? "Placing Order..." : "Place Order"}
  </button>
);

export default CheckoutActions;
