import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Orders from "@/pages/Orders/Orders";
import Tables from "@/pages/Tables/Tables";
import Menu from "@/pages/Menu/Menu";
import Products from "@/pages/Products/Products";
import Categories from "@/pages/Categories/Categories";
import Customers from "@/pages/Customers/Customers";
import Reports from "@/pages/Reports/Reports";
import Settings from "@/pages/Settings/Settings";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

import RestaurantOnboarding from "@/pages/Onboarding/RestaurantOnboarding";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import RestaurantGuard from "./RestaurantGuard";
import OnboardingGuard from "./OnboardingGuard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Route>

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        {/* Usuário autenticado sem restaurante */}
        <Route element={<OnboardingGuard />}>
          <Route path="/onboarding" element={<RestaurantOnboarding />} />
        </Route>

        {/* Usuário autenticado com restaurante */}
        <Route element={<RestaurantGuard />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/painel" replace />} />
            <Route path="/painel" element={<Dashboard />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/mesas" element={<Tables />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/clientes" element={<Customers />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="*" element={<Navigate to="/painel" replace />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
