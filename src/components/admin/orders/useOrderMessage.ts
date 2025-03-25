
import { useCallback } from 'react';
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/formatters';
import { Order } from '@/types/orders';

export const useOrderMessage = () => {
  const generateOrderMessage = useCallback((order: Order, template: string) => {
    let message = template;
    
    // Replace basic order details
    message = message
      .replace('{orderNumber}', order.orderNumber)
      .replace('{date}', formatDate(order.date))
      .replace('{status}', getStatusConfig(order.status).label)
      .replace('{customer.name}', order.customer.name)
      .replace('{customer.email}', order.customer.email)
      .replace('{paymentMethod}', order.paymentMethod)
      .replace('{shipping}', formatCurrency(order.shipping))
      .replace('{discount}', formatCurrency(order.discount))
      .replace('{subtotal}', formatCurrency(order.subtotal))
      .replace('{total}', formatCurrency(order.total));

    // Generate products text
    const productsText = order.items.map((item) => 
      `${item.quantity}x ${item.name} - ${formatCurrency(item.price)} cada = ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');
    
    // Replace products placeholder with actual products
    message = message.replace('{products}', productsText);

    return message;
  }, []);

  return { generateOrderMessage };
};
