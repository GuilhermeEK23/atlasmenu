// ==========================================================
// Tipos centrais do AtlasMenu
// Preparados para futuramente refletir o schema do backend
// (Supabase / PostgreSQL / Firebase / API REST).
// ==========================================================

export interface Restaurant {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  cnpj?: string;
  address?: string;
  logoUrl?: string;
  planName?: string;
  planStatus?: 'active' | 'inactive' | 'trial';
}

export type OrderStatus = 'novo' | 'em_preparo' | 'pronto' | 'finalizado' | 'cancelado';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  code: string;
  tableId?: string;
  tableName?: string;
  customerId?: string;
  customerName?: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export type TableStatus = 'free' | 'occupied' | 'reserved' | 'unavailable';

export interface Table {
  id: string;
  number: string;
  seats: number;
  area?: string;
  status: TableStatus;
  occupiedSinceMinutes?: number;
  reservedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  categoryName?: string;
  imageUrl?: string;
  available: boolean;
  stock?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderAt?: string;
}

export interface DashboardStats {
  ordersToday: number;
  ordersTodayChangePct?: number;
  preparing: number;
  ready: number;
  revenueToday: number;
  revenueTodayChangePct?: number;
  totalOrders: number;
  completedOrders: number;
  averageTicket: number;
  ordersSummary: { label: string; value: number }[];
  ordersByHour: { label: string; value: number }[];
  topProducts: { name: string; sales: number }[];
  ongoingOrders: Order[];
  tableStatusBreakdown: { status: TableStatus; label: string; count: number; pct: number }[];
  totalTables: number;
}

export interface ReportsData {
  revenue: number;
  ordersCount: number;
  averageTicket: number;
  productsSold: number;
  revenueByPeriod: { label: string; value: number }[];
  ordersByPeriod: { label: string; value: number }[];
  topProducts: { name: string; sales: number }[];
  busiestHours: { label: string; value: number }[];
}

export interface RecentActivity {
  id: string;
  tableName: string;
  description: string;
  time: string;
}
