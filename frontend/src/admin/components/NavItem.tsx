import { NavLink } from "react-router-dom";
interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}
const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
          isActive
            ? "bg-indigo-100 text-indigo-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon className="w-4 h-4" />
      {label}
    </NavLink>
  );
};
export default NavItem;
