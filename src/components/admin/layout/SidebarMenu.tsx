
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Tag,
  BarChart2,
  Settings,
  LogOut,
  Truck,
  Package,
  Store,
  Ticket
} from 'lucide-react';

interface SidebarMenuProps {
  isMobile?: boolean;
  collapsed?: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ isMobile = false, collapsed = false }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'Vendas',
      path: '/admin/pedidos',
      icon: <Store size={20} />,
    },
    {
      title: 'Produtos',
      path: '/admin/produtos',
      icon: <ShoppingBag size={20} />,
    },
    {
      title: 'Categorias',
      path: '/admin/categorias',
      icon: <Tag size={20} />,
    },
    {
      title: 'Marcas',
      path: '/admin/marcas',
      icon: <Package size={20} />,
    },
    {
      title: 'Estoque',
      path: '/admin/estoque',
      icon: <Truck size={20} />,
    },
    {
      title: 'Clientes',
      path: '/admin/clientes',
      icon: <Users size={20} />,
    },
    {
      title: 'Cupons',
      path: '/admin/cupons',
      icon: <Ticket size={20} />,
    },
    {
      title: 'Relatórios',
      path: '/admin/financeiro/relatorios',
      icon: <BarChart2 size={20} />,
    },
    {
      title: 'Configurações',
      path: '/admin/configuracoes',
      icon: <Settings size={20} />,
    },
  ];

  return (
    <nav className={`p-2 md:p-4 flex flex-col flex-1 ${isMobile ? 'pt-0' : ''}`}>
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-imperio-navy text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              end={item.path === '/admin'}
            >
              <span className="flex items-center">
                {item.icon}
              </span>
              {!collapsed && <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto pt-4">
        <NavLink
          to="/admin/logout"
          className="flex items-center px-3 py-2.5 rounded-md transition-colors text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          {!collapsed && <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Sair</span>}
        </NavLink>
      </div>
    </nav>
  );
};
