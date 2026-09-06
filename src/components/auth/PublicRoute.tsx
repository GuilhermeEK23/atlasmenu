import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import LoadingAuth from "./LoadingAuth";

export function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingAuth />;
  }

  if (user) {
    return <Navigate to="/painel" replace />;
  }

  return <Outlet />;
}
