import type { RouteObject } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Coupons from "./pages/Coupons";
import Reviews from "./pages/Reviews";
export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "coupons", element: <Coupons /> },
      { path: "reviews", element: <Reviews /> },
    ],
  },
];
