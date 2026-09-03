export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value}%`;
}

export function formatDate(dateIso: string): string {
  try {
    return new Date(dateIso).toLocaleDateString('pt-BR');
  } catch {
    return dateIso;
  }
}
