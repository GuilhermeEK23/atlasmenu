import { useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import SelectInput from '@/components/SelectInput';
import type { Table, TableStatus } from '@/types';

interface AddTableModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Table, 'id'>) => void;
}

const statusOptions: { value: TableStatus; label: string }[] = [
  { value: 'free', label: 'Livre' },
  { value: 'occupied', label: 'Ocupada' },
  { value: 'reserved', label: 'Reservada' },
  { value: 'unavailable', label: 'Indisponível' },
];

export default function AddTableModal({ open, onClose, onSave }: AddTableModalProps) {
  const [number, setNumber] = useState('');
  const [seats, setSeats] = useState('2');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState<TableStatus>('free');
  const [errors, setErrors] = useState<{ number?: string; seats?: string }>({});

  const reset = () => {
    setNumber('');
    setSeats('2');
    setArea('');
    setStatus('free');
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!number.trim()) newErrors.number = 'Informe o número ou nome da mesa.';
    if (!seats || Number(seats) <= 0) newErrors.seats = 'Informe a quantidade de lugares.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      number: number.trim(),
      seats: Number(seats),
      area: area.trim() || undefined,
      status,
    });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Adicionar mesa"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar mesa</Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormInput
          label="Número ou nome da mesa"
          placeholder="Ex: 07 ou Mesa da Varanda"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          error={errors.number}
        />
        <FormInput
          label="Quantidade de lugares"
          type="number"
          min={1}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          error={errors.seats}
        />
        <FormInput
          label="Área (opcional)"
          placeholder="Ex: Salão Principal, Área Externa"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <SelectInput
          label="Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as TableStatus)}
        />
      </div>
    </Modal>
  );
}
