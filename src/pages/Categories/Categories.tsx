import { useState } from 'react';
import { Plus, Tag, Pencil, Trash2 } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import StatusBadge from '@/components/StatusBadge';
import ConfirmModal from '@/components/ConfirmModal';
import CategoryFormModal from './CategoryFormModal';
import { useAsyncData } from '@/hooks/useAsyncData';
import { createCategory, deleteCategory, getCategories } from '@/services/categoriesService';
import type { Category } from '@/types';

export default function Categories() {
  const { data: initialCategories, loading, error, reload } = useAsyncData(getCategories);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const effectiveCategories = (categories ?? initialCategories ?? []).sort(
    (a, b) => a.order - b.order
  );

  const handleSave = async (data: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...data, id: `local-${Date.now()}` };
    setCategories([...(categories ?? initialCategories ?? []), newCategory]);
    setModalOpen(false);
    await createCategory(data);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setCategories(effectiveCategories.filter((c) => c.id !== deleteTarget.id));
    await deleteCategory(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title="Categorias"
        subtitle="Organize as categorias do seu cardápio."
        action={
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            Nova categoria
          </Button>
        }
      />

      <Card padded>
        {loading && <LoadingState rows={4} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && effectiveCategories.length === 0 && (
          <EmptyState
            icon={Tag}
            title="Nenhuma categoria cadastrada."
            description="Crie categorias como Hambúrgueres, Bebidas ou Sobremesas para organizar seu cardápio."
            action={
              <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
                Nova categoria
              </Button>
            }
          />
        )}
        {!loading && !error && effectiveCategories.length > 0 && (
          <div className="divide-y divide-border/60">
            {effectiveCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-sm font-medium text-text-primary">{category.name}</p>
                  {category.description && (
                    <p className="text-xs text-text-secondary">{category.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    label={category.status === 'active' ? 'Ativa' : 'Inativa'}
                    tone={category.status === 'active' ? 'success' : 'neutral'}
                  />
                  <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-white">
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(category)}
                    className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-danger"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <CategoryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Excluir categoria"
        message={`Tem certeza de que deseja excluir "${deleteTarget?.name}"? Os produtos vinculados não serão excluídos.`}
        confirmLabel="Excluir"
        danger
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
