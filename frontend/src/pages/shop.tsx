import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

const Shop = () => {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("Default");

  const categories = useMemo(() => {
    const uniq = new Set<string>();
    products.forEach((p) => {
      if (p.category) uniq.add(p.category);
    });
    return ["All", ...Array.from(uniq)];
  }, [products]);

  const filtered = useMemo(() => {
    let filteredList =
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory);

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
  }, [products, selectedCategory, sortOption]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading products...</div>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-white min-h-screen py-10 px-3 sm:px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
            Shop
          </h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Browse through our collection of premium furniture and decor.
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base border transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Count */}
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

        {/* Products Grid */}
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-3
    xl:grid-cols-4
    gap-6
    w-full
    max-w-[1400px]
    mx-auto
    px-4 sm:px-6 md:px-8
  "
        >
          {filtered.length > 0 ? (
            filtered.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full py-10">
              No products found.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
