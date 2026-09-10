import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  User,
  FileEdit,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export default function Header({ onOpenMobileMenu }: HeaderProps) {
  const { signOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg-950/80 px-4 py-3.5 backdrop-blur-md sm:px-6">
      <button
        onClick={onOpenMobileMenu}
        className="rounded-lg p-2 text-text-secondary hover:bg-white/5 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      <div className="relative w-full max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          type="text"
          placeholder="Buscar pedido, mesa ou cliente..."
          className="input-base pl-10"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <button
          className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Notificações"
        >
          <Bell size={20} />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              R
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-tight text-text-primary">
                Restaurante
              </p>
              <p className="text-xs leading-tight text-text-secondary">
                Administrador
              </p>
            </div>
            <ChevronDown
              size={16}
              className="hidden text-text-secondary sm:block"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-surface-card shadow-soft">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  R
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Restaurante
                  </p>
                  <p className="text-xs text-text-secondary">Administrador</p>
                </div>
              </div>
              <div className="py-1.5">
                <button className="nav-item w-full rounded-none px-4">
                  <User size={16} />
                  Meu perfil
                </button>
                <button className="nav-item w-full rounded-none px-4">
                  <FileEdit size={16} />
                  <span className="flex-1 text-left">
                    Preencher informações
                  </span>
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand">
                    Pendente
                  </span>
                </button>
                <button className="nav-item w-full rounded-none px-4">
                  <Settings size={16} />
                  Configurações da conta
                </button>
                <button className="nav-item w-full rounded-none px-4">
                  <CreditCard size={16} />
                  Assinatura e cobrança
                </button>
              </div>
              <div className="border-t border-border py-1.5">
                <button
                  className="nav-item w-full rounded-none px-4 text-danger hover:text-danger"
                  onClick={signOut}
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
