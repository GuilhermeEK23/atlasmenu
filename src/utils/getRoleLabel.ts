export type RestaurantRole = "admin" | "manager" | "waiter";

export function getRoleLabel(role: RestaurantRole): string {
  const labels: Record<RestaurantRole, string> = {
    admin: "Administrador",
    manager: "Gerente",
    waiter: "Garçom",
  };

  return labels[role];
}
