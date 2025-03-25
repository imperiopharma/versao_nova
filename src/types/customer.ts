
/**
 * Tipos para gerenciamento de clientes
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  total_spent?: number;
  total_orders?: number;
  last_order_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomerFilterOptions {
  status: 'all' | 'active' | 'inactive';
  sort: 'name' | 'email' | 'total_spent' | 'last_order';
  sortDirection: 'asc' | 'desc';
}
