import { LogOut, User } from "lucide-react";

const Topbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      <h1 className="text-lg font-semibold">Welcome, Admin 👋</h1>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600">
          <User className="w-4 h-4" /> Profile
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </header>
  );
};
export default Topbar;
