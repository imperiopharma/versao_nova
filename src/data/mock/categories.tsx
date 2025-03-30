
import React from 'react';
import { Pill, ShoppingBag } from 'lucide-react';
import { Category, ServiceCard } from '@/types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Produtos Emagrecedores',
    title: 'PRODUTOS EMAGRECEDORES',
    description: 'Fórmulas exclusivas para perda de peso',
    icon: () => <Pill className="h-6 w-6" />,
    link: '/categoria/emagrecedores',
    color: 'bg-imperio-navy',
    active: true
  },
  {
    id: '2',
    name: 'Medicamentos de Farmácia',
    title: 'MEDICAMENTOS DE FARMÁCIA',
    description: 'Medicamentos de alta qualidade',
    icon: () => <ShoppingBag className="h-6 w-6" />,
    link: '/categoria/medicamentos',
    color: 'bg-imperio-gold',
    active: true
  }
];

export const mockServiceCards: ServiceCard[] = [
  {
    id: '1',
    title: 'Entrega Expressa',
    description: 'Entrega em até 24h para capitais',
    icon: () => <ShoppingBag className="h-6 w-6" />,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Atendimento 24h',
    description: 'Suporte disponível a qualquer hora',
    icon: () => <Pill className="h-6 w-6" />,
    color: 'bg-green-500'
  }
];
