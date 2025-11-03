import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}
const ProtectedRoute = ({
  children,
  adminOnly = false,
}: ProtectedRouteProps) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
