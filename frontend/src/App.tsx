import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import Shop from "@/pages/shop";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetails from "@/pages/ProductDetails";
import CartPage from "@/pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Coupons from "./admin/pages/Coupons";
import AddProduct from "./admin/pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />      
        <Route path="*" element={<p className="text-center mt-20">Page not found</p>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminproducts"
          element={
            <ProtectedRoute adminOnly>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproducts"
          element={
            <ProtectedRoute adminOnly>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminorders"
          element={
            <ProtectedRoute adminOnly>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admincoupons"
          element={
            <ProtectedRoute adminOnly>
              <Coupons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
