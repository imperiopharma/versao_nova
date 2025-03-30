
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/contexts/CartContext';
import { CheckoutProvider } from '@/contexts/CheckoutContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { CheckoutDadosPage } from './pages/CheckoutDadosPage';
import { CheckoutResumoPage } from './pages/CheckoutResumoPage';
import { CheckoutPagamentoPage } from './pages/CheckoutPagamentoPage';
import { AdminAuthGuard } from './components/auth/AdminAuthGuard';
import { CalculadoraFretePage } from '@/pages/CalculadoraFretePage';

// Importar diretamente os módulos que estão causando erro
import ProductPage from '@/pages/ProductDetailsPage';
import CategoryPage from '@/pages/CategoryProductsPage';
import BrandsPage from '@/pages/BrandProductsPage';
import RegisterPage from '@/pages/LoginPage'; // Temporário, deve ser substituído
import AdminLoginPage from '@/pages/admin/LoginPage';
import AdminDashboardPage from '@/pages/admin/Dashboard';
import AdminProductsPage from '@/pages/admin/ProductsPage';
import OrdersPage from '@/pages/admin/OrdersPage';
import AdminCategoriesPage from '@/pages/admin/ProductsPage'; // Temporário, deve ser substituído  
import AdminBrandsPage from '@/pages/admin/ProductsPage'; // Temporário, deve ser substituído

const queryClient = new QueryClient();

function App() {
  return (
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
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/produtos" element={<AdminProductsPage />} />
                <Route path="/admin/pedidos" element={<OrdersPage />} />
                <Route path="/admin/categorias" element={<AdminCategoriesPage />} />
                <Route path="/admin/marcas" element={<AdminBrandsPage />} />
                <Route path="/calculadora-frete" element={<CalculadoraFretePage />} />
              </Routes>
              <Toaster />
            </Router>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
