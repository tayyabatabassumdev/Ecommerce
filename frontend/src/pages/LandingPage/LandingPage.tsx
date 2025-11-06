import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HeroSection from "./sections/HeroSection";
// import CategoriesSection from "./sections/CategoriesSection";
import ProductsSection from "./sections/ProductsSection";
import InspirationSection from "./sections/InspirationSection";
import { useProducts } from "../../hooks/useProducts";

export default function LandingPage() {
  const { products, loading, error, categories } = useProducts();

  return (
    <div className="min-h-screen w-full font-sans text-gray-800">
      <Header />
      <HeroSection />
      {/* <CategoriesSection categories={categories} /> */}
      <ProductsSection products={products} loading={loading} error={error} />
      <InspirationSection />
      <Footer />
    </div>
  );
}
