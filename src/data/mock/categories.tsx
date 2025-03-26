import React from 'react';
import { TagIcon, PillIcon, HeartIcon } from 'lucide-react';
import { Category, ServiceCard } from '@/types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Produtos Emagrecedores',
    title: 'Produtos Emagrecedores',
    description: 'Fórmulas exclusivas para perda de peso',
    icon: () => <HeartIcon className="h-6 w-6" />,
    link: '/categoria/emagrecedores',
    color: 'bg-red-500',
    active: true
  },
  {
    id: '2',
    name: 'Medicamentos de Farmácia',
    title: 'Medicamentos de Farmácia',
    description: 'Medicamentos de alta qualidade',
    icon: () => <PillIcon className="h-6 w-6" />,
    link: '/categoria/medicamentos',
    color: 'bg-blue-500',
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
    icon: () => <ActivityIcon className="h-6 w-6" />,
    color: 'bg-purple-500'
  }
];
