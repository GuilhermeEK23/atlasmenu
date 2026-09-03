import type { Order, OrderStatus } from '@/types';

// ==========================================================
// ordersService
// Camada de acesso a dados de pedidos.
// Hoje retorna dados vazios; no futuro, substitua o corpo
// destas funções por chamadas reais (Supabase, REST, etc).
// A interface (assinatura das funções) deve permanecer igual.
// ==========================================================

export async function getOrders(): Promise<Order[]> {
  return [];
}

export async function getOrderById(_id: string): Promise<Order | null> {
  return null;
}

export async function updateOrderStatus(
  _id: string,
  _status: OrderStatus
): Promise<void> {
  // TODO: implementar chamada ao backend
}

export async function cancelOrder(_id: string): Promise<void> {
  // TODO: implementar chamada ao backend
}

export async function finalizeOrder(_id: string): Promise<void> {
  // TODO: implementar chamada ao backend
}
