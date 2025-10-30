// src/components/Navbar.tsx
import { ShoppingCart, Heart, Search, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Zustand store for auth

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];
const items = useCartStore((state) => state.items);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        <h1 className="text-2xl font-bold text-yellow-600 cursor-pointer" onClick={() => navigate("/")}>
          Furnito
        </h1>
        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`cursor-pointer hover:text-yellow-600 transition ${
                location.pathname === link.path ? "text-yellow-600 font-semibold" : ""
              }`}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          {!user ? (
            <>
              <li className="cursor-pointer hover:text-yellow-600 transition">
                <Link to="/login">Login</Link>
              </li>
              <li className="cursor-pointer hover:text-yellow-600 transition">
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => logout()}
            >
              Logout
            </li>
          )}
        </ul>
        <div className="flex space-x-5 items-center">
          <Heart className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition" />
          <Search className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition" />
          <User
            className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition"
            onClick={() => (user ? navigate("/profile") : navigate("/login"))}
          />
           <div className="relative">
  <ShoppingCart
    className="cursor-pointer hover:text-yellow-600"
    onClick={() => navigate("/cart")}
  />
  {items.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {items.length}
    </span>
  )}
</div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <ul className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`cursor-pointer hover:text-yellow-600 transition ${
                location.pathname === link.path ? "text-yellow-600 font-semibold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          {!user ? (
            <>
              <li
                className="cursor-pointer hover:text-yellow-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/login">Login</Link>
              </li>
              <li
                className="cursor-pointer hover:text-yellow-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
            >
              Logout
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
