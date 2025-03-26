
import React from 'react';
import { HeartIcon, PillIcon, TagIcon, Activity } from 'lucide-react';
import { Category, ServiceCard } from '@/types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Proteínas',
    title: 'Proteínas',
    description: 'Suplementos proteicos para ganho de massa muscular',
    icon: () => <HeartIcon className="h-6 w-6" />,
    link: '/categoria/proteinas',
    color: 'bg-red-500',
    active: true
  },
  {
    id: '2',
    name: 'Suplementos',
    title: 'Suplementos',
    description: 'Suplementos diversos para performance',
    icon: () => <PillIcon className="h-6 w-6" />,
    link: '/categoria/suplementos',
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
    icon: () => <Activity className="h-6 w-6" />,
    color: 'bg-purple-500'
  }
];
