
import React from 'react';
import { TagIcon, PillIcon, HeartIcon, MoonIcon, ActivityIcon, ScrollIcon } from 'lucide-react';
import { Category, ServiceCard } from '@/types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Emagrecedores',
    title: 'Emagrecedores',
    description: 'Produtos para emagrecimento saudável',
    icon: () => <TagIcon className="h-6 w-6" />,
    link: '/categoria/emagrecedores',
    color: 'bg-red-500',
    active: true
  },
  {
    id: '2',
    name: 'Suplementos',
    title: 'Suplementos',
    description: 'Suplementos para melhorar sua performance',
    icon: () => <PillIcon className="h-6 w-6" />,
    link: '/categoria/suplementos',
    color: 'bg-blue-500',
    active: true
  },
  {
    id: '3',
    name: 'Vitaminas',
    title: 'Vitaminas',
    description: 'Vitaminas para sua saúde',
    icon: () => <HeartIcon className="h-6 w-6" />,
    link: '/categoria/vitaminas',
    color: 'bg-green-500',
    active: true
  },
  {
    id: '4',
    name: 'Hormônios',
    title: 'Hormônios',
    description: 'Hormônios e moduladores',
    icon: () => <ActivityIcon className="h-6 w-6" />,
    link: '/categoria/hormonios',
    color: 'bg-purple-500',
    active: true
  },
  {
    id: '5',
    name: 'Relaxantes',
    title: 'Relaxantes',
    description: 'Relaxantes musculares e tranquilizantes',
    icon: () => <MoonIcon className="h-6 w-6" />,
    link: '/categoria/relaxantes',
    color: 'bg-indigo-500',
    active: false
  },
  {
    id: '6',
    name: 'Fitoterápicos',
    title: 'Fitoterápicos',
    description: 'Produtos fitoterápicos naturais',
    icon: () => <ScrollIcon className="h-6 w-6" />,
    link: '/categoria/fitoterapicos',
    color: 'bg-emerald-500',
    active: false
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
