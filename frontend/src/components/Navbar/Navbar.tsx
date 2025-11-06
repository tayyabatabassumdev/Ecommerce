import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import WishlistDrawer from "../WishlistDrawer/WishlistDrawer";
import SearchDrawer from "../SearchDrawer/SearchDrawer";
import NavbarLinks from "./NavbarLinks";
import NavbarIcons from "./NavbarIcons";
import MobileMenu from "./MobileMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import type { NavLink } from "./types";


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useOutsideClick(profileRef, () => setShowProfileMenu(false));

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

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

          <NavbarLinks
            navLinks={navLinks}
            currentPath={location.pathname}
            user={user}
            logout={logout}
          />

          <NavbarIcons
            user={user}
            setIsWishlistOpen={setIsWishlistOpen}
            setIsSearchOpen={setIsSearchOpen}
            setShowProfileMenu={setShowProfileMenu}
            showProfileMenu={showProfileMenu}
            profileRef={profileRef}
            navigate={navigate}
            logout={logout}
          />

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          navLinks={navLinks}
          user={user}
          logout={logout}
        />
      </nav>

      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
