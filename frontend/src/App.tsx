import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Shop from "@/pages/shop";
import Checkout from "./pages/Checkout";
import ProductDetails from "@/pages/ProductDetails";
import CartPage from "@/pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Coupons from "./admin/pages/Coupons";
import Reviews from "./admin/pages/Reviews";
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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
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
          path="/adminreviews"
          element={
            <ProtectedRoute adminOnly>
              <Reviews />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
