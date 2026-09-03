import { useMemo, useState } from 'react';
import { ShoppingBag, ClipboardList, CheckCircle2, Eye, XCircle, Check } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import StatCard from '@/components/StatCard';
import Card from '@/components/Card';
import Table, { type TableColumn } from '@/components/Table';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import StatusBadge from '@/components/StatusBadge';
import Pagination from '@/components/Pagination';
import ConfirmModal from '@/components/ConfirmModal';
import { useAsyncData } from '@/hooks/useAsyncData';
import { cancelOrder, finalizeOrder, getOrders } from '@/services/ordersService';
import { formatCurrency } from '@/utils/formatters';
import type { Order, OrderStatus } from '@/types';

const filters: { key: 'todos' | OrderStatus; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'novo', label: 'Novos' },
  { key: 'em_preparo', label: 'Em preparo' },
  { key: 'pronto', label: 'Prontos' },
  { key: 'finalizado', label: 'Finalizados' },
];

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

const PAGE_SIZE = 8;

export default function Orders() {
  const { data: orders, loading, error, reload } = useAsyncData(getOrders);
  const [activeFilter, setActiveFilter] = useState<'todos' | OrderStatus>('todos');
  const [page, setPage] = useState(1);
  const [cancelTarget, setCancelTarget] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const list = orders ?? [];
    if (activeFilter === 'todos') return list;
    return list.filter((o) => o.status === activeFilter);
  }, [orders, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const ordersToday = orders?.length ?? 0;
  const preparing = orders?.filter((o) => o.status === 'em_preparo').length ?? 0;
  const ready = orders?.filter((o) => o.status === 'pronto').length ?? 0;

  const columns: TableColumn<Order>[] = [
    { key: 'code', header: 'Pedido', render: (o) => <span className="font-medium text-text-primary">{o.code}</span> },
    { key: 'table', header: 'Mesa', render: (o) => o.tableName ?? '—' },
    { key: 'customer', header: 'Cliente', render: (o) => o.customerName ?? '—' },
    {
      key: 'status',
      header: 'Status',
      render: (o) => <StatusBadge label={orderStatusLabel[o.status]} tone={orderStatusTone[o.status]} />,
    },
    { key: 'value', header: 'Valor', render: (o) => formatCurrency(o.total) },
    {
      key: 'time',
      header: 'Horário',
      render: (o) => new Date(o.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
    {
      key: 'actions',
      header: '',
      render: (o) => (
        <div className="flex items-center gap-1.5">
          <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-white" title="Visualizar pedido">
            <Eye size={16} />
          </button>
          <button
            className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-success"
            title="Finalizar pedido"
            onClick={() => finalizeOrder(o.id).then(reload)}
          >
            <Check size={16} />
          </button>
          <button
            className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-danger"
            title="Cancelar pedido"
            onClick={() => setCancelTarget(o)}
          >
            <XCircle size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Pedidos"
        subtitle="Acompanhe e gerencie todos os pedidos do seu estabelecimento."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={ShoppingBag} label="Pedidos hoje" value={ordersToday} tone="brand" />
        <StatCard icon={ClipboardList} label="Em preparo" value={preparing} tone="violet" />
        <StatCard icon={CheckCircle2} label="Prontos" value={ready} tone="success" />
      </div>

      <Card padded={false}>
        <div className="flex flex-wrap gap-2 border-b border-border p-4">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setActiveFilter(f.key);
                setPage(1);
              }}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-brand text-white shadow-glow'
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && <div className="p-5"><LoadingState rows={5} /></div>}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState title="Nenhum pedido encontrado." />
        )}
        {!loading && !error && filtered.length > 0 && (
          <>
            <Table columns={columns} rows={paginated} getRowKey={(o) => o.id} />
            <div className="p-4">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </Card>

      <ConfirmModal
        open={!!cancelTarget}
        title="Cancelar pedido"
        message={`Tem certeza de que deseja cancelar o pedido ${cancelTarget?.code}? Esta ação não pode ser desfeita.`}
        confirmLabel="Cancelar pedido"
        danger
        onClose={() => setCancelTarget(null)}
        onConfirm={() => {
          if (cancelTarget) cancelOrder(cancelTarget.id).then(reload);
          setCancelTarget(null);
        }}
      />
    </div>
  );
}
