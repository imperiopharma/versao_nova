
import React from 'react';
import { HeartIcon, PillIcon, Tag as TagIcon, Activity, ShoppingBag, Dumbbell, Apple } from 'lucide-react';
import { Category, ServiceCard } from '@/types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Produtos Emagrecedores',
    title: 'PRODUTOS EMAGRECEDORES',
    description: 'Fórmulas exclusivas para perda de peso',
    icon: () => <HeartIcon className="h-6 w-6" />,
    link: '/categoria/emagrecedores',
    color: 'bg-red-500',
    active: true
  },
  {
    id: '2',
    name: 'Medicamentos de Farmácia',
    title: 'MEDICAMENTOS DE FARMÁCIA',
    description: 'Medicamentos de alta qualidade',
    icon: () => <PillIcon className="h-6 w-6" />,
    link: '/categoria/medicamentos',
    color: 'bg-blue-500',
    active: true
  },
  {
    id: '3',
    name: 'PRODUTOS EMAGRECEDORES',
    title: 'PRODUTOS EMAGRECEDORES',
    description: 'Fórmulas exclusivas para perda de peso',
    icon: () => <ShoppingBag className="h-6 w-6" />,
    link: '/categoria/suplementos',
    color: 'bg-green-500',
    active: true
  },
  {
    id: '4',
    name: 'MEDICAMENTOS DE FARMÁCIA',
    title: 'MEDICAMENTOS DE FARMÁCIA',
    description: 'Medicamentos de alta qualidade',
    icon: () => <Dumbbell className="h-6 w-6" />,
    link: '/categoria/proteinas',
    color: 'bg-purple-500',
    active: true
  },
  {
    id: '5',
    name: 'Vitaminas',
    title: 'Vitaminas',
    description: 'Para sua saúde e bem-estar',
    icon: () => <Apple className="h-6 w-6" />,
    link: '/categoria/vitaminas',
    color: 'bg-yellow-500',
    active: true
  }
];

export const mockServiceCards: ServiceCard[] = [
  {
    id: '1',
    title: 'Entrega Expressa',
    description: 'Entrega em até 24h para capitais',
    icon: () => <TagIcon className="h-6 w-6" />,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Atendimento 24h',
    description: 'Suporte disponível a qualquer hora',
    icon: () => <HeartIcon className="h-6 w-6" />,
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Qualidade Garantida',
    description: 'Produtos com certificação de qualidade',
    icon: () => <Activity className="h-6 w-6" />,
    color: 'bg-purple-500'
  }
];
