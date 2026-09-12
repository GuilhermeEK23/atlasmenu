import { RestaurantContext } from "@/contexts/RestaurantContext";
import { useContext } from "react";

const useRestaurant = () => {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error(
      "useRestaurant deve ser utilizado dentro do RestaurantProvider",
    );
  }

  return context;
};

export default useRestaurant;
