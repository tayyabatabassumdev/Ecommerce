import { LogOut } from "lucide-react";
import type { NavigateFunction } from "react-router-dom";
import type { LogoutFn } from "./types";

interface ProfileMenuProps {
  navigate: NavigateFunction;
  logout: LogoutFn;
}

export default function ProfileMenu({ navigate, logout }: ProfileMenuProps) {
  return (
    <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg border border-gray-100 py-2 animate-fadeIn">
      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        onClick={() => navigate("/profile")}
      >
        My Profile
      </button>
      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        onClick={() => navigate("/orders")}
      >
        My Orders
      </button>
      <hr className="my-1" />
      <button
        className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
        onClick={logout}
      >
        Logout <LogOut size={14} />
      </button>
    </div>
  );
}
