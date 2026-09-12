import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Grid3x3,
  BookOpen,
  Package,
  Tag,
  Users,
  BarChart3,
  Settings,
  Crown,
  HelpCircle,
  LogOut,
  ChefHat,
  X,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

const navItems = [
  { to: "/painel", label: "Painel", icon: Home },
  { to: "/pedidos", label: "Pedidos", icon: ShoppingBag },
  { to: "/mesas", label: "Mesas", icon: Grid3x3 },
  { to: "/cardapio", label: "Cardápio", icon: BookOpen },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/categorias", label: "Categorias", icon: Tag },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const { signOut } = useAuth();
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-bg-900 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <ChefHat size={20} />
            </div>
            <div>
              <p className="text-base font-extrabold leading-none tracking-tight">
                ATLAS<span className="text-brand">MENU</span>
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary">
                Cardápio digital inteligente
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3.5 pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `nav-item ${isActive ? "nav-item-active" : ""}`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-3 border-t border-border px-3.5 py-4">
          <div className="rounded-xl border border-brand/30 bg-brand/10 p-3.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Crown size={16} className="text-brand" />
              Plano Profissional
            </div>
            <p className="mt-1 text-xs font-medium text-success">Ativo</p>
          </div>

          <button className="nav-item w-full">
            <HelpCircle size={18} />
            Central de ajuda
          </button>

          <button
            className="nav-item w-full text-danger hover:text-danger"
            onClick={signOut}
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
