// src/components/AddressForm.tsx
import React, { useState } from "react";
import type { Address } from "../types/checkout";

interface Props {
  onChange: (address: Address) => void;
}

const AddressForm: React.FC<Props> = ({ onChange }) => {
  const [address, setAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...address, [name]: value };
    setAddress(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="firstName"
          value={address.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          name="lastName"
          value={address.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          name="email"
          type="email"
          value={address.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg sm:col-span-2"
          required
        />
        <input
          name="phone"
          type="tel"
          value={address.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-3 rounded-lg sm:col-span-2"
          required
        />
        <input
          name="line1"
          value={address.line1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="border p-3 rounded-lg sm:col-span-2"
          required
        />
        <input
          name="line2"
          value={address.line2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="border p-3 rounded-lg sm:col-span-2"
        />
        <input
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="State / Province"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="postalCode"
          value={address.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Country"
          className="border p-3 rounded-lg"
          required
        />
      </div>
    </div>
  );
};

export default AddressForm;
