import { Link, useLocation, useNavigate } from "react-router-dom";
import type { NavLink, User, LogoutFn } from "./types";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navLinks: NavLink[];
  user: User | null;
  logout: LogoutFn;
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  navLinks,
  user,
  logout,
}: MobileMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    setTimeout(() => navigate("/"), 800);
  };

  return (
    <ul className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3 animate-fadeIn">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <li
            key={link.name}
            className={`cursor-pointer transition ${
              isActive ? "text-yellow-600 font-semibold" : "hover:text-yellow-600"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        );
      })}

      {!user ? (
        <>
          <li
            className="cursor-pointer hover:text-yellow-600 transition"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/login">Login</Link>
          </li>
          <li
            className="cursor-pointer hover:text-yellow-600 transition"
            onClick={() => setIsOpen(false)}
          >
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
