import {
  ShoppingCart,
  Heart,
  Search,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import WishlistDrawer from "./WishlistDrawer";
import SearchDrawer from "./SearchDrawer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "@/store/cartStore";
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 md:px-10 py-4">
          <h1
            className="text-2xl font-bold text-yellow-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Furnito
          </h1>
          <ul className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`cursor-pointer hover:text-yellow-600 transition ${
                  location.pathname === link.path
                    ? "text-yellow-600 font-semibold"
                    : ""
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
            <Heart
              className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition"
              onClick={() => setIsWishlistOpen(true)}
            />
            <Search
              className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition"
              onClick={() => setIsSearchOpen(true)}
            />
            <div className="relative" ref={profileRef}>
              <User
                className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition"
                onClick={() =>
                  user
                    ? setShowProfileMenu(!showProfileMenu)
                    : navigate("/login")
                }
              />
              {showProfileMenu && user && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg border border-gray-100 py-2 animate-fadeIn">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      navigate("/profile");
                      setShowProfileMenu(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      navigate("/orders");
                      setShowProfileMenu(false);
                    }}
                  >
                    My Orders
                  </button>
                  <hr className="my-1" />
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                  >
                    Logout <LogOut size={14} />
                  </button>
                </div>
              )}
            </div>
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
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <ul className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`cursor-pointer hover:text-yellow-600 transition ${
                  location.pathname === link.path
                    ? "text-yellow-600 font-semibold"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
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
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
