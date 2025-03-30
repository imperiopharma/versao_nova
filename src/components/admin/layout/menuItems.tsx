
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Banknote,
  Settings,
  LogOut,
  Tags
} from 'lucide-react';

export type MenuItem = {
  name: string;
  path?: string;
  icon: React.ReactNode;
  submenu?: { name: string; path: string }[];
};

export const menuItems: MenuItem[] = [
  { 
    name: 'Dashboard', 
    path: '/admin', 
    icon: <LayoutDashboard size={20} /> 
  },
  { 
    name: 'Pedidos', 
    path: '/admin/pedidos', 
    icon: <ShoppingCart size={20} /> 
  },
  {
    name: 'Produtos',
    path: '/admin/produtos',
    icon: <Package size={20} />
  },
  {
    name: 'Clientes',
    path: '/admin/clientes',
    icon: <Users size={20} />
  },
  {
    name: 'Cupons',
    path: '/admin/cupons',
    icon: <Tags size={20} />
  },
  {
    name: 'Financeiro',
    icon: <Banknote size={20} />,
    submenu: [
      { name: 'Relatórios', path: '/admin/financeiro/relatorios' },
      { name: 'Faturamento', path: '/admin/financeiro/faturamento' },
      { name: 'Pagamentos', path: '/admin/financeiro/pagamentos' }
    ]
  },
  {
    name: 'Configurações',
    path: '/admin/configuracoes',
    icon: <Settings size={20} />
  }
];

export const logoutItem = {
  name: 'Sair',
  path: '/admin/logout',
  icon: <LogOut size={18} />
};

// Credenciais de administrador (para simulação)
export const adminCredentials = {
  email: 'admin@exemplo.com',
  password: 'admin123'
};
