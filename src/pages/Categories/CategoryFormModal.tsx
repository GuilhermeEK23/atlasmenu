import { useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import SelectInput from '@/components/SelectInput';
import type { Category } from '@/types';

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Category, 'id'>) => void;
}

export default function CategoryFormModal({ open, onClose, onSave }: CategoryFormModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [order, setOrder] = useState('1');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setDescription('');
    setStatus('active');
    setOrder('1');
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Informe o nome da categoria.');
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      status,
      order: Number(order) || 1,
    });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nova categoria"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar categoria</Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormInput
          label="Nome da categoria"
          placeholder="Ex: Hambúrgueres, Bebidas, Sobremesas"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
        />
        <FormInput
          label="Descrição (opcional)"
          placeholder="Breve descrição da categoria"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectInput
            label="Status"
            options={[
              { value: 'active', label: 'Ativa' },
              { value: 'inactive', label: 'Inativa' },
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
          />
          <FormInput
            label="Ordem de exibição"
            type="number"
            min={1}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
