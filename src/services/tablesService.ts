import type { Table } from '@/types';

// ==========================================================
// tablesService — camada de acesso a dados de mesas.
// Retorna dados vazios até a conexão com um backend real.
// ==========================================================

export async function getTables(): Promise<Table[]> {
  return [];
}

export async function createTable(_data: Omit<Table, 'id'>): Promise<Table | null> {
  // TODO: implementar chamada ao backend
  return null;
}

export async function updateTable(_id: string, _data: Partial<Table>): Promise<void> {
  // TODO: implementar chamada ao backend
}

export async function deleteTable(_id: string): Promise<void> {
  // TODO: implementar chamada ao backend
}
