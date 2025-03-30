import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/contexts/CartContext';
import { CheckoutProvider } from '@/contexts/CheckoutContext';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import BrandsPage from './pages/BrandsPage';
import CartPage from './pages/CartPage';
import CheckoutDadosPage from './pages/CheckoutDadosPage';
import CheckoutResumoPage from './pages/CheckoutResumoPage';
import CheckoutPagamentoPage from './pages/CheckoutPagamentoPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminBrandsPage from './pages/admin/AdminBrandsPage';
import { AdminAuthGuard } from './components/auth/AdminAuthGuard';
import { CalculadoraFretePage } from '@/pages/CalculadoraFretePage';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="imperio-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/produto/:slug" element={<ProductPage />} />
                  <Route path="/categoria/:slug" element={<CategoryPage />} />
                  <Route path="/marcas" element={<BrandsPage />} />
                  <Route path="/carrinho" element={<CartPage />} />
                  <Route path="/checkout/dados" element={<CheckoutDadosPage />} />
                  <Route path="/checkout/resumo" element={<CheckoutResumoPage />} />
                  <Route path="/checkout/pagamento" element={<CheckoutPagamentoPage />} />
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminAuthGuard><AdminDashboardPage /></AdminAuthGuard>} />
                  <Route path="/admin/produtos" element={<AdminAuthGuard><AdminProductsPage /></AdminAuthGuard>} />
                  <Route path="/admin/pedidos" element={<AdminAuthGuard><AdminOrdersPage /></AdminAuthGuard>} />
                  <Route path="/admin/categorias" element={<AdminAuthGuard><AdminCategoriesPage /></AdminAuthGuard>} />
                  <Route path="/admin/marcas" element={<AdminAuthGuard><AdminBrandsPage /></AdminAuthGuard>} />
                  <Route path="/calculadora-frete" element={<CalculadoraFretePage />} />
                </Routes>
                <Toaster />
              </Router>
            </CheckoutProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
