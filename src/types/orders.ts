
/**
 * Order management system types
 */

// Customer information
export interface Customer {
  name: string;
  email: string;
  phone?: string;
}

// Order item representing a product in an order
export interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
}

// Available order statuses
export type OrderStatus = 
  | 'pending'
  | 'paid'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'canceled';

// Payment methods
export type PaymentMethod = 
  | 'PIX'
  | 'Cartão de Crédito'
  | 'Boleto'
  | 'Transferência Bancária';

// Main order interface
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentProofUrl?: string; // URL do comprovante
}

// Filter options for orders list
export interface OrderFilters {
  status: OrderStatus | 'all';
  period: string;
}

// Status configuration for UI display
export interface StatusConfig {
  color: string;
  text: string;
}
