import { Heart, Search, ShoppingCart, User } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { useCartStore } from "@/store/cartStore";
import type { NavbarIconsProps } from "./types";

export default function NavbarIcons({
  user,
  setIsWishlistOpen,
  setIsSearchOpen,
  setShowProfileMenu,
  showProfileMenu,
  profileRef,
  navigate,
  logout,
}: NavbarIconsProps) {
  const items = useCartStore((state) => state.items);

  return (
    <div className="flex space-x-5 items-center">
      <Heart
        className="w-5 h-5 cursor-pointer hover:text-yellow-600 transition"
        onClick={() => (user ? setIsWishlistOpen(true) : navigate("/login"))}
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
              ? setShowProfileMenu((prev) => !prev)
              : navigate("/login")
          }
        />
        {showProfileMenu && user && (
          <ProfileMenu navigate={navigate} logout={logout} />
        )}
      </div>

      <div className="relative">
        <ShoppingCart
          className="cursor-pointer hover:text-yellow-600"
          onClick={() => (user ? navigate("/cart") : navigate("/login"))}
        />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </div>
    </div>
  );
}
