
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericAmount);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// Função aprimorada para criar URLs de imagem seguras
export function getSafeImageUrl(url: string | undefined | null, fallback: string, name?: string): string {
  // Se a URL não existir, estiver vazia ou for undefined/null
  if (!url || url.trim() === '') {
    // Criar um placeholder com o nome da marca, se disponível
    return name 
      ? `https://placehold.co/200x100/001f3f/ffffff?text=${encodeURIComponent(name.replace(/\s+/g, '+'))}`
      : fallback;
  }
  
  // Se a URL já começar com http ou https, retorná-la diretamente
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Caso contrário, retornar a URL como está (pode ser uma URL relativa)
  return url;
}
