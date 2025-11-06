import { useState, useMemo, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard/ProductCard";
import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
const Shop = () => {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("Default");
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase().trim() || "";
  const categories = useMemo(() => {
    const uniq = new Set<string>();
    products.forEach((p) => {
      if (p?.category) {
        p.category.split(",").forEach((cat) => uniq.add(cat.trim()));
      }
    });
    return ["All", ...Array.from(uniq)];
  }, [products]);
  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    let filteredList =
      selectedCategory === "All"
        ? products
        : products.filter(
            (p) =>
              p?.category &&
              p.category
                .split(",")
                .map((c) => c.trim())
                .includes(selectedCategory)
          );
    if (searchTerm) {
      filteredList = filteredList.filter(
        (p) =>
          p?.name?.toLowerCase().includes(searchTerm) ||
          p?.description?.toLowerCase().includes(searchTerm)
      );
    }
    if (sortOption === "Price: Low to High") {
      filteredList = filteredList
        .slice()
        .sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortOption === "Price: High to Low") {
      filteredList = filteredList
        .slice()
        .sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortOption === "Newest") {
      filteredList = filteredList
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return filteredList;
  }, [products, selectedCategory, sortOption, searchTerm]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading products...</div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-10 px-3 sm:px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            {searchTerm
              ? `Showing results for “${searchTerm}”`
              : "Browse through our curated collection of products."}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar scroll-smooth">
            {categories.map((category) => (
              <button
                key={category}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-yellow-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <span className="text-gray-500 text-sm">
              {filtered.length} results
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 text-gray-700 text-sm px-3 py-2 rounded-md focus:outline-none"
            >
              <option value="Default">Sort by: Default</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-6
            w-full
            max-w-[1400px]
            mx-auto
          "
        >
          {Array.isArray(filtered) &&
          filtered.filter((p) => p && p._id).length > 0 ? (
            filtered
              .filter((p) => p && p._id)
              .map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg mb-6">
                {searchTerm
                  ? `No results found for “${searchTerm}”.`
                  : "No products available in this category."}
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
              >
                Go Back to Shop
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
