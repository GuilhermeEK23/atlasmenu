import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import useAuth from "@/hooks/useAuth";
import useRestaurant from "@/hooks/useRestaurant";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantOnboarding = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { refreshRestaurant } = useRestaurant();
  const navigate = useNavigate();

  async function handleCreateRestaurant() {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    // 1. Criar restaurante
    const { data: restaurant, error: restaurantError } = await supabase.rpc(
      "create_restaurant",
      {
        restaurant_name: restaurantName,
        restaurant_slug: slug,
      },
    );

    if (restaurantError) {
      throw restaurantError;
    }

    await refreshRestaurant();

    // 3. Cadastro concluído
    navigate("/painel", { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await handleCreateRestaurant();
    } catch (error) {
      console.error("Erro ao criar restaurante:", error);
    } finally {
      setLoading(false);
    }
  };

  const createSlug = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  useEffect(() => {
    setSlug(createSlug(restaurantName));
  }, [restaurantName]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Bem-vindo ao AtlasMenu!</h1>
      <p>
        Para começar, precisamos de algumas informações sobre o seu
        estabelecimento.
      </p>
      <form className="flex flex-col gap-4 w-1/3 mt-20" onSubmit={handleSubmit}>
        <FormInput
          label="Nome do Estabelecimento"
          type="text"
          placeholder="Nome do Estabelecimento"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <FormInput
          label="Slug"
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Continuar"}
        </Button>
      </form>
    </div>
  );
};

export default RestaurantOnboarding;
