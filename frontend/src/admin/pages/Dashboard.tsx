import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  PlusCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingReviews: number;
  totalUsers: number;
  revenue: number;
}
interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}
interface Order {
  _id: string;
  customer: string;
  total: number;
  status: string;
  createdAt: string;
}
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const base = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, revenueRes, ordersRes] = await Promise.all([
          axios.get(`${base}/admin/stats`),
          axios.get(`${base}/admin/revenue`),
          axios.get(`${base}/admin/orders?limit=5`),
        ]);
        setStats(statsRes.data.data);
        setRevenueData(revenueRes.data.data);
        setRecentOrders(ordersRes.data.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [base]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 animate-pulse">
        Loading dashboard...
      </div>
    );
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>
          <nav className="space-y-3">
            <SidebarLink
              label="Dashboard"
              icon={<TrendingUp className="w-5 h-5" />}
              onClick={() => navigate("/admin")}
            />
            <SidebarLink
              label="Products"
              icon={<Package className="w-5 h-5" />}
              onClick={() => navigate("/admin/products")}
            />
            <SidebarLink
              label="Add Product"
              icon={<PlusCircle className="w-5 h-5" />}
              onClick={() => navigate("/admin/add-product")}
            />
            <SidebarLink
              label="Orders"
              icon={<ShoppingCart className="w-5 h-5" />}
              onClick={() => navigate("/admin/orders")}
            />
            <SidebarLink
              label="Users"
              icon={<Users className="w-5 h-5" />}
              onClick={() => navigate("/admin/users")}
            />
          </nav>
        </div>
        <div className="p-6 border-t">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Ecom Admin
          </p>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            color="from-indigo-500 to-indigo-600"
            icon={<Package className="w-8 h-8 text-indigo-100" />}
          />
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            color="from-emerald-500 to-emerald-600"
            icon={<ShoppingCart className="w-8 h-8 text-emerald-100" />}
          />
          <StatCard
            title="Pending Reviews"
            value={stats?.pendingReviews || 0}
            color="from-amber-400 to-amber-500"
            icon={<Star className="w-8 h-8 text-amber-100" />}
          />
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            color="from-pink-500 to-pink-600"
            icon={<Users className="w-8 h-8 text-pink-100" />}
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue & Orders Trend
          </h3>
          {revenueData.length === 0 ? (
            <p className="text-gray-500 text-sm">No data available.</p>
          ) : (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" tick={{ fill: "#888" }} />
                  <YAxis tick={{ fill: "#888" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-indigo-600 font-medium">
                      #{o._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-3">{o.customer}</td>
                    <td className="p-3">₹{o.total.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          o.status === "delivered"
                            ? "bg-green-100 text-green-600"
                            : o.status === "processing"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

const SidebarLink = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition"
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StatCard = ({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}) => (
  <div
    className={`flex items-center justify-between br ${color} text-white p-5 rounded-2xl shadow-md hover:shadow-xl transform transition hover:-translate-y-1`}
  >
    <div>
      <h4 className="text-sm opacity-90">{title}</h4>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
    <div className="bg-white bg-opacity-20 p-3 rounded-full">{icon}</div>
  </div>
);
