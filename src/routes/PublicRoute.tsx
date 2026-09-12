import LoadingPage from "@/components/LoadingPage";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    return <Navigate to="/painel" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
