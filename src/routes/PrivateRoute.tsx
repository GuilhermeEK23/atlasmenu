import LoadingPage from "@/components/LoadingPage";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <RestaurantProvider>
      <Outlet />
    </RestaurantProvider>
  );
};

export default PrivateRoute;
