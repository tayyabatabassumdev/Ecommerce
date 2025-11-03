import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  Star,
} from "lucide-react";
const Sidebar = () => {
  const links = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/admin" },
    { name: "Products", icon: Package, to: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, to: "/admin/orders" },
    { name: "Coupons", icon: Tag, to: "/admin/coupons" },
    { name: "Reviews", icon: Star, to: "/admin/reviews" },
  ];
  return (
    <aside className="w-64 bg-white border-r flex flex-col shadow-sm">
      <div className="p-4 font-semibold text-lg text-center border-b">
        E-Shop Admin
      </div>
      <nav className="flex-1 mt-4">
        {links.map(({ name, icon: Icon, to }) => (
          <NavLink
            key={name}
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
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;
