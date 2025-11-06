import React, { useState, useEffect } from "react";
import type { Address } from "../types/checkout";

interface AddressFormProps {
  onChange: (address: Address) => void;
}

const initialAddress: Address = {
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
};

const AddressForm: React.FC<AddressFormProps> = ({ onChange }) => {
  const [address, setAddress] = useState<Address>(initialAddress);

  useEffect(() => {
    onChange(address);
  }, [address, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (name: keyof Address, placeholder: string, type = "text", colSpan = 1, required = true) => (
    <input
      name={name}
      type={type}
      value={address[name]}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border p-3 rounded-lg ${colSpan > 1 ? "sm:col-span-2" : ""}`}
      required={required}
    />
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderInput("firstName", "First Name")}
        {renderInput("lastName", "Last Name")}
        {renderInput("email", "Email", "email", 2)}
        {renderInput("phone", "Phone Number", "tel", 2)}
        {renderInput("line1", "Address Line 1", "text", 2)}
        {renderInput("city", "City")}
        {renderInput("state", "State / Province")}
        {renderInput("postalCode", "Postal Code")}
        {renderInput("country", "Country")}
      </div>
    </div>
  );
};

export default AddressForm;
