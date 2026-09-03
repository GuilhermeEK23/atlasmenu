import { Plus, BookOpen } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Card from '@/components/Card';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCategories } from '@/services/categoriesService';
import { getProducts } from '@/services/productsService';
import { formatCurrency } from '@/utils/formatters';

export default function Menu() {
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
    reload: reloadCategories,
  } = useAsyncData(getCategories);
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
    reload: reloadProducts,
  } = useAsyncData(getProducts);

  const loading = loadingCategories || loadingProducts;
  const error = errorCategories || errorProducts;
  const isEmpty = (categories?.length ?? 0) === 0 && (products?.length ?? 0) === 0;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Cardápio"
        subtitle="Administre a estrutura do seu cardápio digital."
        action={
          <Button icon={<Plus size={16} />}>Adicionar item</Button>
        }
      />

      <Card padded>
        {loading && <LoadingState rows={4} />}
        {!loading && error && (
          <ErrorState message={error} onRetry={() => { reloadCategories(); reloadProducts(); }} />
        )}
        {!loading && !error && isEmpty && (
          <EmptyState
            icon={BookOpen}
            title="Seu cardápio ainda não possui itens."
            description="Cadastre categorias e produtos para montar o cardápio digital do seu estabelecimento."
            action={<Button icon={<Plus size={16} />}>Adicionar item</Button>}
          />
        )}
        {!loading && !error && !isEmpty && (
          <div className="space-y-8">
            {(categories ?? []).map((category) => {
              const categoryProducts = (products ?? []).filter(
                (p) => p.categoryId === category.id
              );
              return (
                <div key={category.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-text-primary">
                      {category.name}
                    </h2>
                    <span className="text-xs text-text-secondary">
                      {categoryProducts.length} itens
                    </span>
                  </div>
                  {categoryProducts.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-text-secondary">
                      Nenhum produto nesta categoria ainda.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-xl border border-border bg-surface-raised px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {product.name}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {formatCurrency(product.price)}
                            </p>
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
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
