import  Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  image: string;
  count: number;
}

export default function CategoriesSection({ categories }: { categories: Category[] }) {
  const navigate = useNavigate();

  return (
    <section className="text-center py-16 px-6 md:px-10 bg-white">
      <h3 className="text-3xl font-bold mb-10">Browse The Range</h3>

      {categories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigate(`/shop?category=${encodeURIComponent(category.name)}`)
                }
                className="overflow-hidden rounded-2xl shadow-md group cursor-pointer bg-white"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/400x300?text=No+Image")
                    }
                    className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-1">
                    {category.name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {category.count} {category.count === 1 ? "product" : "products"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              onClick={() => navigate("/shop")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
            >
              Explore More Categories →
            </Button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No categories available</p>
      )}
    </section>
  );
}
