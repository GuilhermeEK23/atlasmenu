import { useState } from 'react';
import { DollarSign, ShoppingBag, Receipt, Package, LineChart } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import SelectInput from '@/components/SelectInput';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getReports, type ReportPeriod } from '@/services/reportsService';
import { formatCurrency } from '@/utils/formatters';

const periodOptions: { value: ReportPeriod; label: string }[] = [
  { value: 'today', label: 'Hoje' },
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
  { value: 'custom', label: 'Personalizado' },
];

export default function Reports() {
  const [period, setPeriod] = useState<ReportPeriod>('7d');
  const { data: report, loading, error, reload } = useAsyncData(() => getReports(period), [period]);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Relatórios"
        subtitle="Acompanhe o desempenho do seu estabelecimento."
        action={
          <SelectInput
            className="!py-2 !text-xs"
            options={periodOptions}
            value={period}
            onChange={(e) => setPeriod(e.target.value as ReportPeriod)}
          />
        }
      />

      {loading && <LoadingState rows={4} label="Carregando relatórios..." />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && report && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={DollarSign} label="Faturamento" value={formatCurrency(report.revenue)} tone="brand" />
            <StatCard icon={ShoppingBag} label="Pedidos" value={report.ordersCount} tone="info" />
            <StatCard icon={Receipt} label="Ticket médio" value={formatCurrency(report.averageTicket)} tone="violet" />
            <StatCard icon={Package} label="Produtos vendidos" value={report.productsSold} tone="success" />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card padded>
              <h2 className="mb-4 text-base font-semibold text-text-primary">Faturamento por período</h2>
              {report.revenueByPeriod.length === 0 ? (
                <EmptyState icon={LineChart} title="Não há dados disponíveis para este período." />
              ) : (
                <div className="h-56" />
              )}
            </Card>

            <Card padded>
              <h2 className="mb-4 text-base font-semibold text-text-primary">Pedidos por período</h2>
              {report.ordersByPeriod.length === 0 ? (
                <EmptyState icon={LineChart} title="Não há dados disponíveis para este período." />
              ) : (
                <div className="h-56" />
              )}
            </Card>

            <Card padded>
              <h2 className="mb-4 text-base font-semibold text-text-primary">Produtos mais vendidos</h2>
              {report.topProducts.length === 0 ? (
                <EmptyState title="Não há dados disponíveis para este período." />
              ) : (
                <div className="space-y-3">
                  {report.topProducts.map((p, i) => (
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
              <h2 className="mb-4 text-base font-semibold text-text-primary">Horários de maior movimento</h2>
              {report.busiestHours.length === 0 ? (
                <EmptyState icon={LineChart} title="Não há dados disponíveis para este período." />
              ) : (
                <div className="h-56" />
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
