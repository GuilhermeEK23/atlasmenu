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

export default function AppRoutes() {
  return (
    <Routes>
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
    </Routes>
  );
}
