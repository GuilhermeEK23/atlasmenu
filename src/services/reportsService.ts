import type { ReportsData } from '@/types';

export type ReportPeriod = 'today' | '7d' | '30d' | 'custom';

// ==========================================================
// reportsService — dados agregados para a tela de Relatórios.
// Retorna um estado "zerado" até a conexão com um backend real.
// ==========================================================

export async function getReports(_period: ReportPeriod): Promise<ReportsData> {
  return {
    revenue: 0,
    ordersCount: 0,
    averageTicket: 0,
    productsSold: 0,
    revenueByPeriod: [],
    ordersByPeriod: [],
    topProducts: [],
    busiestHours: [],
  };
}
