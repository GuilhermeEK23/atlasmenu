import type { Customer } from '@/types';

// ==========================================================
// customersService — camada de acesso a dados de clientes.
// Retorna dados vazios até a conexão com um backend real.
// ==========================================================

export async function getCustomers(): Promise<Customer[]> {
  return [];
}

export async function getCustomerById(_id: string): Promise<Customer | null> {
  return null;
}
