import { useState } from 'react';
import {
  Store,
  UserCog,
  Palette,
  BookOpen,
  ShoppingBag,
  CreditCard,
  Crown,
  ShieldCheck,
} from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

const sections = [
  { key: 'restaurant', label: 'Informações do restaurante', icon: Store },
  { key: 'account', label: 'Dados da conta', icon: UserCog },
  { key: 'customization', label: 'Personalização', icon: Palette },
  { key: 'menu', label: 'Cardápio', icon: BookOpen },
  { key: 'orders', label: 'Pedidos', icon: ShoppingBag },
  { key: 'payment', label: 'Pagamento', icon: CreditCard },
  { key: 'plan', label: 'Plano', icon: Crown },
  { key: 'security', label: 'Segurança', icon: ShieldCheck },
] as const;

type SectionKey = (typeof sections)[number]['key'];

export default function Settings() {
  const [active, setActive] = useState<SectionKey>('restaurant');

  return (
    <div className="space-y-6">
      <PageTitle title="Configurações" subtitle="Gerencie as configurações do seu estabelecimento." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <Card padded={false} className="h-fit">
          <nav className="space-y-1 p-3">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`nav-item w-full ${active === s.key ? 'nav-item-active' : ''}`}
              >
                <s.icon size={17} />
                {s.label}
              </button>
            ))}
          </nav>
        </Card>

        <Card padded>
          {active === 'restaurant' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Informações do restaurante</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput label="Nome" placeholder="Nome do estabelecimento" />
                <FormInput label="Telefone" placeholder="(00) 00000-0000" />
                <FormInput label="E-mail" type="email" placeholder="contato@restaurante.com" />
                <FormInput label="CNPJ (opcional)" placeholder="00.000.000/0000-00" />
              </div>
              <FormInput label="Endereço" placeholder="Rua, número, bairro, cidade" />
              <div>
                <span className="mb-1.5 block text-sm font-medium text-text-primary">Logo</span>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-border text-text-secondary">
                    <Store size={22} />
                  </div>
                  <Button variant="secondary">Enviar logo</Button>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <Button>Salvar alterações</Button>
              </div>
            </div>
          )}

          {active === 'account' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Dados da conta</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput label="Nome do administrador" placeholder="Seu nome" />
                <FormInput label="E-mail de acesso" type="email" placeholder="voce@email.com" />
              </div>
              <div className="border-t border-border pt-4">
                <Button>Salvar alterações</Button>
              </div>
            </div>
          )}

          {active === 'customization' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Personalização</h2>
              <p className="text-sm text-text-secondary">
                Personalize as cores e a identidade visual do seu cardápio digital.
              </p>
              <div className="border-t border-border pt-4">
                <Button>Salvar alterações</Button>
              </div>
            </div>
          )}

          {active === 'menu' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Cardápio</h2>
              <p className="text-sm text-text-secondary">
                Defina preferências gerais de exibição do cardápio digital.
              </p>
              <div className="border-t border-border pt-4">
                <Button>Salvar alterações</Button>
              </div>
            </div>
          )}

          {active === 'orders' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Pedidos</h2>
              <p className="text-sm text-text-secondary">
                Configure regras de recebimento e notificação de novos pedidos.
              </p>
              <div className="border-t border-border pt-4">
                <Button>Salvar alterações</Button>
              </div>
            </div>
          )}

          {active === 'payment' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Pagamento</h2>
              <p className="text-sm text-text-secondary">
                Configure as formas de pagamento aceitas pelo seu estabelecimento.
              </p>
              <div className="border-t border-border pt-4">
                <Button>Salvar alterações</Button>
              </div>
            </div>
          )}

          {active === 'plan' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Plano</h2>
              <div className="rounded-xl border border-brand/30 bg-brand/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Crown size={16} className="text-brand" />
                  Plano Profissional
                </div>
                <p className="mt-1 text-xs font-medium text-success">Ativo</p>
              </div>
              <Button variant="secondary">Gerenciar plano</Button>
            </div>
          )}

          {active === 'security' && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-text-primary">Segurança</h2>
              <FormInput label="Senha atual" type="password" placeholder="••••••••" />
              <FormInput label="Nova senha" type="password" placeholder="••••••••" />
              <div className="border-t border-border pt-4">
                <Button>Atualizar senha</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
