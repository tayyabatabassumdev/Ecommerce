// src/components/Navbar/types.ts
import type { NavigateFunction } from "react-router-dom";
export interface NavLink {
  name: string;
  path: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
}
export interface LogoutFn {
  (): Promise<void> | void;
}
export interface NavbarIconsProps {
  user: User | null;
  setIsWishlistOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showProfileMenu: boolean;
    profileRef: React.RefObject<HTMLDivElement | null>;
  navigate: NavigateFunction;
  logout: LogoutFn;
}
