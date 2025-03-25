
import { Pill, Heart, Phone, Truck, CalendarIcon } from 'lucide-react';
import { Category, ServiceCard } from '@/types/category';

export const mockCategories: Category[] = [
  {
    id: 'emagrecedores',
    title: 'Emagrecedores',
    description: 'Produtos para a perda de peso',
    icon: () => <Pill size={20} />,
    link: '/categoria/emagrecedores',
    color: 'bg-white'
  },
  {
    id: 'farmacia',
    title: 'Farmácia',
    description: 'Medicamentos e suplementos essenciais',
    icon: () => <Heart size={20} />,
    link: '/categoria/farmacia',
    color: 'bg-white'
  }
];

export const mockServiceCards: ServiceCard[] = [
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Perguntas frequentes',
    icon: () => <Phone size={20} />,
    link: '/faq',
    color: 'bg-blue-100'
  },
  {
    id: 'fretes',
    title: 'Fretes',
    description: 'Consulte nossas opções',
    icon: () => <Truck size={20} />,
    link: '/fretes',
    color: 'bg-green-100'
  },
  {
    id: 'pedidos',
    title: 'Ciclos Prontos',
    description: 'Combos preparados',
    icon: () => <CalendarIcon size={20} />,
    link: '/ciclos',
    color: 'bg-yellow-100'
  }
];
