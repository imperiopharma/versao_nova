
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Banknote,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

type MenuItem = {
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

interface SidebarMenuProps {
  isMobile?: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ isMobile = false }) => {
  const location = useLocation();
  
  // Function to check if a menu item is active
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  // Check if a submenu item is active
  const isSubmenuActive = (submenu: { name: string; path: string }[]) => {
    return submenu.some(item => location.pathname.startsWith(item.path));
  };

  return (
    <>
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.submenu ? (
                <div className="mb-2">
                  <div className={`flex items-center justify-between px-4 py-2 rounded-md ${
                    isSubmenuActive(item.submenu) ? 'bg-blue-50 text-imperio-navy' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3 truncate">{item.name}</span>
                    </div>
                    <ChevronDown size={16} />
                  </div>
                  
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`block px-4 py-2 rounded-md truncate ${
                            location.pathname === subItem.path || location.pathname.startsWith(subItem.path)
                              ? 'bg-blue-50 text-imperio-navy font-medium' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-imperio-navy font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 truncate">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t p-4">
        <Link to="/admin/logout" className="flex items-center text-red-500 hover:text-red-600">
          <LogOut size={18} />
          <span className="ml-3 truncate">Sair</span>
        </Link>
      </div>
    </>
  );
};
