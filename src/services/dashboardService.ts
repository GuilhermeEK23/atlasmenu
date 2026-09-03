import type { DashboardStats } from '@/types';

// ==========================================================
// dashboardService — agrega estatísticas do painel principal.
// Retorna um estado "zerado" até a conexão com um backend real.
// ==========================================================

export async function getDashboardStats(): Promise<DashboardStats> {
  return {
    ordersToday: 0,
    preparing: 0,
    ready: 0,
    revenueToday: 0,
    totalOrders: 0,
    completedOrders: 0,
    averageTicket: 0,
    ordersSummary: [],
    ordersByHour: [],
    topProducts: [],
    ongoingOrders: [],
    tableStatusBreakdown: [],
    totalTables: 0,
  };
}
