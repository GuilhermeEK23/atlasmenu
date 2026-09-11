import useAuth from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { RestaurantRole } from "@/utils/getRoleLabel";
import { createContext, useEffect, useState } from "react";

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  // Adicione outros campos relevantes do restaurante aqui
}

interface RestaurantContextType {
  restaurant: Restaurant | null;
  role: RestaurantRole | null;
  loading: boolean;
  refreshRestaurant: () => Promise<void>;
}

export const RestaurantContext = createContext<
  RestaurantContextType | undefined
>(undefined);

export const RestaurantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, loading: authLoading } = useAuth();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [role, setRole] = useState<RestaurantRole | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRestaurant() {
    if (authLoading) return;

    // Usuário não está autenticado
    if (!user) {
      setRestaurant(null);
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("restaurant_users")
      .select(
        `
          role,
          restaurants (
            *
          )
        `,
      )
      .eq("user_id", user.id);

    if (error) {
      console.error(error);

      setRestaurant(null);
      setRole(null);
      setLoading(false);

      return;
    }

    // Por enquanto, pegar o primeiro restaurante
    const membership = data?.[0];

    if (!membership) {
      setRestaurant(null);
      setRole(null);
      setLoading(false);

      return;
    }

    // Supabase may return a related record as an array.
    const restaurantData = Array.isArray(membership.restaurants)
      ? membership.restaurants[0]
      : membership.restaurants;

    if (!restaurantData) {
      setRestaurant(null);
      setRole(null);
      setLoading(false);
      return;
    }

    setRestaurant(restaurantData);
    setRole(membership.role);

    setLoading(false);
  }

  useEffect(() => {
    loadRestaurant();
  }, [user, authLoading]);

  const refreshRestaurant = async () => {
    await loadRestaurant();
  };

  return (
    <RestaurantContext.Provider
      value={{ restaurant, role, loading, refreshRestaurant }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
