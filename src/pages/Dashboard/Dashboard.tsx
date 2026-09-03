import { ShoppingBag, ClipboardList, CheckCircle2, DollarSign, LineChart, PieChart } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import StatCard from '@/components/StatCard';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import StatusBadge from '@/components/StatusBadge';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getDashboardStats } from '@/services/dashboardService';
import { formatCurrency } from '@/utils/formatters';
import type { OrderStatus } from '@/types';

const orderStatusTone: Record<OrderStatus, 'brand' | 'success' | 'info' | 'violet' | 'danger'> = {
  novo: 'info',
  em_preparo: 'brand',
  pronto: 'success',
  finalizado: 'violet',
  cancelado: 'danger',
};

const orderStatusLabel: Record<OrderStatus, string> = {
  novo: 'Novo',
  em_preparo: 'Em preparo',
  pronto: 'Pronto',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
};

export default function Dashboard() {
  const { data: stats, loading, error, reload } = useAsyncData(getDashboardStats);

  return (
    <div className="space-y-6">
      <PageTitle title="Painel" subtitle="Visão geral do seu estabelecimento." />

      {loading && <LoadingState rows={4} label="Carregando informações do painel..." />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && stats && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={ShoppingBag} label="Pedidos hoje" value={stats.ordersToday} tone="brand" />
            <StatCard icon={ClipboardList} label="Em preparo" value={stats.preparing} tone="violet" />
            <StatCard icon={CheckCircle2} label="Prontos" value={stats.ready} tone="success" />
            <StatCard
              icon={DollarSign}
              label="Faturamento hoje"
              value={formatCurrency(stats.revenueToday)}
              tone="info"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2" padded>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-text-primary">Resumo de pedidos</h2>
              </div>
              {stats.ordersSummary.length === 0 ? (
                <EmptyState
                  icon={LineChart}
                  title="Não há dados suficientes para exibir o gráfico."
                  description="Assim que novos pedidos forem registrados, o resumo aparecerá aqui."
                />
              ) : (
                <div className="h-64" />
              )}

              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-text-secondary">Total de pedidos</p>
                  <p className="mt-1 text-xl font-bold text-text-primary">{stats.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Pedidos concluídos</p>
                  <p className="mt-1 text-xl font-bold text-text-primary">{stats.completedOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Ticket médio</p>
                  <p className="mt-1 text-xl font-bold text-text-primary">
                    {formatCurrency(stats.averageTicket)}
                  </p>
                </div>
              </div>
            </Card>

            <Card padded>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-text-primary">Pedidos em andamento</h2>
              </div>
              {stats.ongoingOrders.length === 0 ? (
                <EmptyState title="Nenhum pedido em andamento." />
              ) : (
                <div className="space-y-3">
                  {stats.ongoingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5"
                    >
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {order.code} · {order.tableName}
                        </p>
                        <p className="text-xs text-text-secondary">{order.customerName}</p>
                      </div>
                      <StatusBadge
                        label={orderStatusLabel[order.status]}
                        tone={orderStatusTone[order.status]}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card padded>
              <h2 className="mb-4 text-base font-semibold text-text-primary">Pedidos por horário</h2>
              {stats.ordersByHour.length === 0 ? (
                <EmptyState
                  icon={LineChart}
                  title="Não há dados suficientes para exibir o gráfico."
                />
              ) : (
                <div className="h-56" />
              )}
            </Card>

            <Card padded>
              <h2 className="mb-4 text-base font-semibold text-text-primary">Top produtos</h2>
              {stats.topProducts.length === 0 ? (
                <EmptyState title="Nenhum produto vendido ainda." />
              ) : (
                <div className="space-y-3">
                  {stats.topProducts.map((p, i) => (
                    <div key={p.name} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">
                        {i + 1}. {p.name}
                      </span>
                      <span className="font-medium text-text-primary">{p.sales}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card padded>
              <h2 className="mb-4 text-base font-semibold text-text-primary">Status das mesas</h2>
              {stats.tableStatusBreakdown.length === 0 ? (
                <EmptyState icon={PieChart} title="Nenhuma mesa cadastrada." />
              ) : (
                <div className="space-y-2">
                  {stats.tableStatusBreakdown.map((s) => (
                    <div key={s.status} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{s.label}</span>
                      <span className="font-medium text-text-primary">
                        {s.count} · {s.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
