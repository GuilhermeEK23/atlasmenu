import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage";
import useRestaurant from "@/hooks/useRestaurant";

const RestaurantGuard = () => {
  const { restaurant, loading } = useRestaurant();

  if (loading) {
    return <LoadingPage />;
  }

  if (!restaurant) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default RestaurantGuard;
