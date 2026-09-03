import { useState } from 'react';
import { Plus, Package, Pencil, Trash2 } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import Button from '@/components/Button';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import ConfirmModal from '@/components/ConfirmModal';
import ProductFormModal from './ProductFormModal';
import { useAsyncData } from '@/hooks/useAsyncData';
import { createProduct, deleteProduct, getProducts } from '@/services/productsService';
import { getCategories } from '@/services/categoriesService';
import { formatCurrency } from '@/utils/formatters';
import type { Product } from '@/types';

export default function Products() {
  const { data: initialProducts, loading, error, reload } = useAsyncData(getProducts);
  const { data: categories } = useAsyncData(getCategories);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const effectiveProducts = products ?? initialProducts ?? [];
  const filtered = effectiveProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...data, id: `local-${Date.now()}` };
    setProducts([...effectiveProducts, newProduct]);
    setModalOpen(false);
    await createProduct(data);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setProducts(effectiveProducts.filter((p) => p.id !== deleteTarget.id));
    await deleteProduct(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title="Produtos"
        subtitle="Cadastre e gerencie os produtos do seu cardápio."
        action={
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            Novo produto
          </Button>
        }
      />

      <Card padded>
        <div className="mb-5">
          <SearchInput
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {loading && <LoadingState rows={4} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && effectiveProducts.length === 0 && (
          <EmptyState
            icon={Package}
            title="Nenhum produto cadastrado."
            description="Adicione o primeiro produto para começar a montar seu cardápio."
            action={
              <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
                Novo produto
              </Button>
            }
          />
        )}
        {!loading && !error && effectiveProducts.length > 0 && filtered.length === 0 && (
          <EmptyState title="Nenhum produto encontrado para essa busca." />
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-border bg-surface-raised p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{product.name}</p>
                    {product.categoryName && (
                      <p className="text-xs text-text-secondary">{product.categoryName}</p>
                    )}
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.available
                        ? 'bg-success/15 text-success'
                        : 'bg-white/10 text-text-secondary'
                    }`}
                  >
                    {product.available ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
                {product.description && (
                  <p className="mt-2 line-clamp-2 text-xs text-text-secondary">
                    {product.description}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-bold text-text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-white">
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-danger"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <ProductFormModal
        open={modalOpen}
        categories={categories ?? []}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Excluir produto"
        message={`Tem certeza de que deseja excluir "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        danger
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
