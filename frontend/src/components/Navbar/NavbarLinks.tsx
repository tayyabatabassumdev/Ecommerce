import { Link, useNavigate } from "react-router-dom";
import type { NavLink, User, LogoutFn } from "./types";

interface NavbarLinksProps {
  navLinks: NavLink[];
  currentPath: string;
  user: User | null;
  logout: LogoutFn;
}

export default function NavbarLinks({
  navLinks,
  currentPath,
  user,
  logout,
}: NavbarLinksProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ul className="hidden md:flex space-x-8 items-center">
      {navLinks.map((link) => {
        const isActive = currentPath === link.path;
        return (
          <li
            key={link.name}
            className={`cursor-pointer transition ${
              isActive ? "text-yellow-600 font-semibold" : "hover:text-yellow-600"
            }`}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        );
      })}

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
          onClick={handleLogout}
        >
          Logout
        </li>
      )}
    </ul>
  );
}
