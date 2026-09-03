import { useMemo, useState } from 'react';
import {
  Grid3x3,
  LayoutGrid,
  List,
  Plus,
  Users,
  Armchair,
  UserCheck,
  CalendarClock,
} from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import StatCard from '@/components/StatCard';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import SelectInput from '@/components/SelectInput';
import Button from '@/components/Button';
import AddTableModal from './AddTableModal';
import { useAsyncData } from '@/hooks/useAsyncData';
import { createTable, getTables } from '@/services/tablesService';
import type { RecentActivity, Table, TableStatus } from '@/types';

const statusMeta: Record<TableStatus, { label: string; dot: string; badgeBg: string; badgeText: string }> = {
  free: { label: 'Livre', dot: 'bg-success', badgeBg: 'bg-success/15', badgeText: 'text-success' },
  occupied: { label: 'Ocupada', dot: 'bg-brand', badgeBg: 'bg-brand/15', badgeText: 'text-brand' },
  reserved: { label: 'Reservada', dot: 'bg-violet', badgeBg: 'bg-violet/15', badgeText: 'text-violet' },
  unavailable: { label: 'Indisponível', dot: 'bg-text-secondary', badgeBg: 'bg-white/10', badgeText: 'text-text-secondary' },
};

export default function Tables() {
  const { data: initialTables, loading, error, reload } = useAsyncData(getTables);
  const [tables, setTables] = useState<Table[] | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [areaFilter, setAreaFilter] = useState('todas');
  const [modalOpen, setModalOpen] = useState(false);

  const effectiveTables = tables ?? initialTables ?? [];

  const areas = useMemo(() => {
    const set = new Set<string>();
    effectiveTables.forEach((t) => t.area && set.add(t.area));
    return Array.from(set);
  }, [effectiveTables]);

  const filteredTables = useMemo(() => {
    if (areaFilter === 'todas') return effectiveTables;
    return effectiveTables.filter((t) => t.area === areaFilter);
  }, [effectiveTables, areaFilter]);

  const groupedByArea = useMemo(() => {
    const groups: Record<string, Table[]> = {};
    filteredTables.forEach((t) => {
      const key = t.area ?? 'Sem área definida';
      groups[key] = groups[key] ?? [];
      groups[key].push(t);
    });
    return groups;
  }, [filteredTables]);

  const total = effectiveTables.length;
  const free = effectiveTables.filter((t) => t.status === 'free').length;
  const occupied = effectiveTables.filter((t) => t.status === 'occupied').length;
  const reserved = effectiveTables.filter((t) => t.status === 'reserved').length;
  const occupancyRate = total > 0 ? Math.round(((occupied + reserved) / total) * 100) : 0;

  const handleSaveTable = async (data: Omit<Table, 'id'>) => {
    const newTable: Table = { ...data, id: `local-${Date.now()}` };
    setTables([...(effectiveTables ?? []), newTable]);
    setActivities((prev) => [
      {
        id: `activity-${Date.now()}`,
        tableName: `Mesa ${newTable.number}`,
        description: 'Mesa cadastrada',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
    setModalOpen(false);
    // Preparado para futuramente persistir no backend:
    await createTable(data);
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title="Mesas"
        subtitle="Gerencie o status das mesas do seu estabelecimento."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Grid3x3} label="Total de mesas" value={total} tone="brand" />
        <StatCard icon={Armchair} label="Mesas livres" value={free} tone="success" />
        <StatCard icon={Users} label="Mesas ocupadas" value={occupied} tone="brand" />
        <StatCard icon={UserCheck} label="Reservadas" value={reserved} tone="violet" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2" padded>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-text-primary">Mapa de mesas</h2>
            <div className="flex flex-wrap items-center gap-2">
              <SelectInput
                className="!py-2 !text-xs"
                options={[
                  { value: 'todas', label: 'Todas as áreas' },
                  ...areas.map((a) => ({ value: a, label: a })),
                ]}
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
              />
              <div className="flex rounded-xl border border-border p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    view === 'grid' ? 'bg-brand text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <LayoutGrid size={14} />
                  Grade
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    view === 'list' ? 'bg-brand text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <List size={14} />
                  Lista
                </button>
              </div>
            </div>
          </div>

          {loading && <LoadingState rows={4} />}
          {!loading && error && <ErrorState message={error} onRetry={reload} />}
          {!loading && !error && total === 0 && (
            <EmptyState
              title="Nenhuma mesa cadastrada."
              description="Adicione a primeira mesa do seu estabelecimento para começar a gerenciar o salão."
              action={
                <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
                  Adicionar mesa
                </Button>
              }
            />
          )}

          {!loading && !error && total > 0 && (
            <div className="space-y-6">
              {Object.entries(groupedByArea).map(([area, areaTables]) => (
                <div key={area}>
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-text-secondary">
                    <Grid3x3 size={14} />
                    {area}
                  </p>

                  {view === 'grid' ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {areaTables.map((t) => {
                        const meta = statusMeta[t.status];
                        return (
                          <div
                            key={t.id}
                            className="rounded-xl border border-border bg-surface-raised p-3.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-text-primary">
                                {t.number}
                              </span>
                              <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                            </div>
                            <p className={`mt-2 text-xs font-medium ${meta.badgeText}`}>
                              {meta.label}
                            </p>
                            <p className="mt-1 text-xs text-text-secondary">
                              {t.seats} lugares
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="divide-y divide-border/60 rounded-xl border border-border">
                      {areaTables.map((t) => {
                        const meta = statusMeta[t.status];
                        return (
                          <div key={t.id} className="flex items-center justify-between px-4 py-3">
                            <div>
                              <p className="text-sm font-medium text-text-primary">Mesa {t.number}</p>
                              <p className="text-xs text-text-secondary">{t.seats} lugares</p>
                            </div>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${meta.badgeBg} ${meta.badgeText}`}>
                              {meta.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-text-secondary">
                {(Object.keys(statusMeta) as TableStatus[]).map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${statusMeta[s].dot}`} />
                    {statusMeta[s].label}
                  </div>
                ))}
              </div>

              <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
                Adicionar mesa
              </Button>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card padded>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary">Resumo do dia</h2>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-white/5">
                <span className="text-2xl font-bold text-text-primary">{occupancyRate}%</span>
              </div>
            </div>
            <p className="text-center text-xs text-text-secondary">Taxa de ocupação</p>

            <div className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Ocupadas
                </span>
                <span className="font-medium text-text-primary">{occupied}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Livres
                </span>
                <span className="font-medium text-text-primary">{free}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" /> Reservadas
                </span>
                <span className="font-medium text-text-primary">{reserved}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2.5">
                <span className="text-text-secondary">Total de atendimentos</span>
                <span className="font-medium text-text-primary">0</span>
              </div>
            </div>
          </Card>

          <Card padded>
            <h2 className="mb-4 text-base font-semibold text-text-primary">Atividades recentes</h2>
            {activities.length === 0 ? (
              <EmptyState icon={CalendarClock} title="Nenhuma atividade recente." />
            ) : (
              <div className="space-y-3">
                {activities.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-text-primary">{a.tableName}</p>
                      <p className="text-xs text-text-secondary">{a.description}</p>
                    </div>
                    <span className="text-xs text-text-secondary">{a.time}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <AddTableModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveTable} />
    </div>
  );
}
