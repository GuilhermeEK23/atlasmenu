import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import SelectInput from '@/components/SelectInput';
import type { Category, Product } from '@/types';

interface ProductFormModalProps {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSave: (data: Omit<Product, 'id'>) => void;
}

export default function ProductFormModal({
  open,
  categories,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  useEffect(() => {
    if (open && categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, categories]);

  const reset = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategoryId('');
    setImageUrl('');
    setStock('');
    setAvailable(true);
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Informe o nome do produto.';
    if (!price || Number(price) <= 0) newErrors.price = 'Informe um preço válido.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const category = categories.find((c) => c.id === categoryId);

    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      price: Number(price),
      categoryId: categoryId || undefined,
      categoryName: category?.name,
      imageUrl: imageUrl.trim() || undefined,
      available,
      stock: stock ? Number(stock) : undefined,
    });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Novo produto"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar produto</Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormInput
          label="Nome do produto"
          placeholder="Ex: Hambúrguer Artesanal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <FormInput
          label="Descrição (opcional)"
          placeholder="Ex: Pão brioche, blend 180g, queijo cheddar..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Preço"
            type="number"
            min={0}
            step="0.01"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
          />
          <SelectInput
            label="Categoria"
            options={
              categories.length > 0
                ? categories.map((c) => ({ value: c.id, label: c.name }))
                : [{ value: '', label: 'Nenhuma categoria cadastrada' }]
            }
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={categories.length === 0}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="URL da imagem (opcional)"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <FormInput
            label="Estoque (opcional)"
            type="number"
            min={0}
            placeholder="Ex: 50"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2.5 text-sm text-text-primary">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-bg-900 accent-brand"
          />
          Produto disponível no cardápio
        </label>
      </div>
    </Modal>
  );
}
