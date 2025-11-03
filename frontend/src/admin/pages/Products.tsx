import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface Variant {
  _id: string;
  stock: number;
}
interface Product {
  _id: string;
  name: string;
  category: string;
  basePrice: number;
  numReviews: number;
  variants: Variant[];
  createdAt: string;
}
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setError("Failed to load products");
      }
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
            <Package className="w-7 h-7 text-indigo-600" />
            Products
          </h1>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow transition"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>
        <div className="relative w-full sm:w-1/3 mb-6">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>
        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-10">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No products found. Try adding a new one!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left bg-gray-100 text-gray-600">
                  <th className="py-3 px-4 rounded-l-lg">Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Base Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Reviews</th>
                  <th className="py-3 px-4 rounded-r-lg text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const totalStock = p.variants?.reduce(
                    (sum, v) => sum + (v.stock || 0),
                    0
                  );

                  return (
                    <tr
                      key={p._id}
                      className={`bg-white hover:bg-indigo-50 transition-all border border-gray-100 shadow-sm ${
                        i % 2 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-medium">{p.name}</td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4">₹{p.basePrice}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            totalStock > 20
                              ? "bg-green-100 text-green-700"
                              : totalStock > 0
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {totalStock ?? 0} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {p.numReviews || 0}
                      </td>
                      <td className="py-3 px-4 flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/edit/${p._id}`)
                          }
                          className="text-indigo-600 hover:text-indigo-800 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/admin/add-product")}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg sm:hidden transition"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Products;
