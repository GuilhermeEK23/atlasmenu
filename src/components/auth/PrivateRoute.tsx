import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import LoadingAuth from "./LoadingAuth";

export function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingAuth />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
