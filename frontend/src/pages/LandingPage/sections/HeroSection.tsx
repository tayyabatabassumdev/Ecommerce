import Button  from "@/components/ui/Button";
import { motion } from "framer-motion";
import heroo from "@/assets/heroo.jpg";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-16 bg-[#f9f7f3] text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl space-y-6"
      >
        <p className="text-gray-500 uppercase tracking-wide">New Arrival</p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover Our New Collection
        </h2>
        <p className="text-gray-600">
          Shop the latest furniture styles and transform your home with modern
          elegance and comfort.
        </p>
        <Button
          onClick={() => navigate("/shop")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
        >
          Shop Now
        </Button>
      </motion.div>

      <img
        src={heroo}
        alt="Hero"
        className="w-full md:w-[400px] rounded-lg shadow-lg mt-10 md:mt-0"
      />
    </section>
  );
}
