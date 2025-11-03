import React, { useState } from "react";
import axios from "axios";
import { PlusCircle, Trash, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
interface Variant {
  id: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
}
const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [stock, setStock] = useState<number | "">("");
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { id: crypto.randomUUID(), attributes: {}, price: 0, stock: 0 },
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleVariantChange = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !basePrice || !category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const imageUrls = await Promise.all(
        images.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = () => reject("Failed to read file");
              reader.readAsDataURL(file);
            })
        )
      );
      const token = localStorage.getItem("token");
      const payload = {
        name,
        basePrice,
        category,
        stock,
        description,
        images: imageUrls,
        variants: variants.map((v) => ({
          attributes: v.attributes,
          price: v.price,
          stock: v.stock,
        })),
      };
      console.log("Token being sent:", localStorage.getItem("token"));
      console.log("Payload:", payload);
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (err: any) {
      console.error("Error adding product:", err);
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Product</h2>
      <Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Furniture"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Price *
              </label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                placeholder="e.g. 100"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock *
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="e.g. 50"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description..."
              rows={4}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {images.length > 0 && (
                <p className="text-sm text-gray-600">
                  {images.length} selected
                </p>
              )}
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Product Variants
              </h3>
              <button
                type="button"
                onClick={handleAddVariant}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <PlusCircle className="w-5 h-5" /> Add Variant
              </button>
            </div>
            {variants.length === 0 && (
              <p className="text-gray-500 text-sm">No variants added yet.</p>
            )}
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="border rounded-lg p-4 mt-3 space-y-3 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">Variant</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(variant.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Attribute (e.g. Size: M, Color: Blue)"
                    onChange={(e) =>
                      handleVariantChange(variant.id, "attributes", {
                        attribute: e.target.value,
                      })
                    }
                    className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "price",
                        Number(e.target.value)
                      )
                    }
                    className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                    className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddProduct;
