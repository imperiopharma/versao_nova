
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';

// Providers
import { CartProvider } from './contexts/CartContext';
import { CheckoutProvider } from './contexts/CheckoutContext';

// Páginas
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { CheckoutDadosPage } from './pages/CheckoutDadosPage';
import { CheckoutResumoPage } from './pages/CheckoutResumoPage';
import { CheckoutPagamentoPage } from './pages/CheckoutPagamentoPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CategoryProductsPage } from './pages/CategoryProductsPage';
import { BrandProductsPage } from './pages/BrandProductsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard'; // Corrigido para importação padrão
import { ProductsPage } from './pages/admin/ProductsPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { CustomersPage } from './pages/admin/CustomersPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { CouponsPage } from './pages/admin/CouponsPage';
import { FinancePage } from './pages/admin/FinancePage';
import NotFound from './pages/NotFound'; // Corrigido para importação padrão
import { FreightInfoPage } from './pages/FreightInfoPage';
import { CalculadoraFretePage } from './pages/CalculadoraFretePage';
import { CombosPage } from './pages/CombosPage';
import { MarketplacePage } from './pages/MarketplacePage';

// Admin Auth Guard
import { AdminAuthGuard } from './components/auth/AdminAuthGuard';

// Criar cliente de consulta
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <CheckoutProvider>
          <Router>
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout/dados" element={<CheckoutDadosPage />} />
              <Route path="/checkout/resumo" element={<CheckoutResumoPage />} />
              <Route path="/checkout/pagamento" element={<CheckoutPagamentoPage />} />
              <Route path="/produto/:slug" element={<ProductDetailsPage />} />
              <Route path="/categoria/:slug" element={<CategoryProductsPage />} />
              <Route path="/marca/:slug" element={<BrandProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/frete" element={<FreightInfoPage />} />
              <Route path="/calculadora-frete" element={<CalculadoraFretePage />} />
              <Route path="/combos" element={<CombosPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              
              {/* Rotas Protegidas do Admin */}
              <Route path="/admin" element={<AdminAuthGuard><Dashboard /></AdminAuthGuard>} />
              <Route path="/admin/dashboard" element={<AdminAuthGuard><Dashboard /></AdminAuthGuard>} />
              <Route path="/admin/pedidos" element={<AdminAuthGuard><OrdersPage /></AdminAuthGuard>} />
              <Route path="/admin/produtos" element={<AdminAuthGuard><ProductsPage /></AdminAuthGuard>} />
              <Route path="/admin/clientes" element={<AdminAuthGuard><CustomersPage /></AdminAuthGuard>} />
              <Route path="/admin/configuracoes" element={<AdminAuthGuard><SettingsPage /></AdminAuthGuard>} />
              <Route path="/admin/cupons" element={<AdminAuthGuard><CouponsPage /></AdminAuthGuard>} />
              <Route path="/admin/financeiro" element={<AdminAuthGuard><FinancePage /></AdminAuthGuard>} />
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </CheckoutProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
