
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const menuItems = [
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-imperio-navy">Admin Painel</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
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
                        <span className="ml-3">{item.name}</span>
                      </div>
                      <ChevronDown size={16} />
                    </div>
                    
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 rounded-md ${
                              location.pathname === subItem.path 
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
                    <span className="ml-3">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t p-4">
          <Link to="/admin/logout" className="flex items-center text-red-500 hover:text-red-600">
            <LogOut size={18} />
            <span className="ml-3">Sair</span>
          </Link>
        </div>
      </aside>
      
      {/* Mobile sidebar - shown as Sheet */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b p-4 flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-4">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold text-imperio-navy">Admin Painel</h1>
            </div>
            
            <nav className="py-4">
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
                            <span className="ml-3">{item.name}</span>
                          </div>
                          <ChevronDown size={16} />
                        </div>
                        
                        <ul className="ml-6 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                to={subItem.path}
                                className={`block px-4 py-2 rounded-md ${
                                  location.pathname === subItem.path 
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
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="border-t p-4">
              <Link to="/admin/logout" className="flex items-center text-red-500 hover:text-red-600">
                <LogOut size={18} />
                <span className="ml-3">Sair</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="text-xl font-bold text-imperio-navy">Admin Painel</h1>
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
