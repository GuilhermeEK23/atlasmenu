import { useState } from 'react';
import { Users } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import SearchInput from '@/components/SearchInput';
import Table, { type TableColumn } from '@/components/Table';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCustomers } from '@/services/customersService';
import { formatCurrency, formatDate } from '@/utils/formatters';
import type { Customer } from '@/types';

export default function Customers() {
  const { data: customers, loading, error, reload } = useAsyncData(getCustomers);
  const [search, setSearch] = useState('');

  const filtered = (customers ?? []).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumn<Customer>[] = [
    { key: 'name', header: 'Nome', render: (c) => <span className="font-medium text-text-primary">{c.name}</span> },
    { key: 'phone', header: 'Telefone', render: (c) => c.phone },
    { key: 'orders', header: 'Quantidade de pedidos', render: (c) => c.ordersCount },
    { key: 'spent', header: 'Total gasto', render: (c) => formatCurrency(c.totalSpent) },
    {
      key: 'last',
      header: 'Último pedido',
      render: (c) => (c.lastOrderAt ? formatDate(c.lastOrderAt) : '—'),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle title="Clientes" subtitle="Consulte o histórico de clientes do seu estabelecimento." />

      <Card padded>
        <div className="mb-5">
          <SearchInput
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {loading && <LoadingState rows={4} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && (customers ?? []).length === 0 && (
          <EmptyState icon={Users} title="Nenhum cliente encontrado." />
        )}
        {!loading && !error && (customers ?? []).length > 0 && filtered.length === 0 && (
          <EmptyState title="Nenhum cliente encontrado para essa busca." />
        )}
        {!loading && !error && filtered.length > 0 && (
          <Table columns={columns} rows={filtered} getRowKey={(c) => c.id} />
        )}
      </Card>
    </div>
  );
}
