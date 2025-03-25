
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";

// Public pages
import { HomePage } from "./pages/HomePage";
import { BrandProductsPage } from "./pages/BrandProductsPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { CheckoutDadosPage } from "./pages/CheckoutDadosPage";
import { CheckoutResumoPage } from "./pages/CheckoutResumoPage";
import { CheckoutPagamentoPage } from "./pages/CheckoutPagamentoPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { FreightInfoPage } from "./pages/FreightInfoPage";
import NotFound from "./pages/NotFound";

// Admin pages
import { AdminLoginPage } from "./pages/admin/LoginPage";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { OrdersPage } from "./pages/admin/OrdersPage";
import { ProductsPage } from "./pages/admin/ProductsPage";
import { CustomersPage } from "./pages/admin/CustomersPage";
import { FinancePage } from "./pages/admin/FinancePage";
import { SettingsPage } from './pages/admin/SettingsPage';

// Private route components
import { AdminAuthGuard } from "./components/auth/AdminAuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <CheckoutProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/marca/:brandId" element={<BrandProductsPage />} />
              <Route path="/marcas" element={<MarketplacePage />} />
              <Route path="/fretes" element={<FreightInfoPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/checkout/dados" element={<CheckoutDadosPage />} />
              <Route path="/checkout/resumo" element={<CheckoutResumoPage />} />
              <Route path="/checkout/pagamento" element={<CheckoutPagamentoPage />} />
              
              {/* Admin login route - public access */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              
              {/* Protected admin routes */}
              <Route element={<AdminAuthGuard />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/vendas" element={<AdminDashboard />} />
                <Route path="/admin/pedidos" element={<OrdersPage />} />
                <Route path="/admin/produtos" element={<ProductsPage />} />
                <Route path="/admin/categorias" element={<AdminDashboard />} />
                <Route path="/admin/marcas" element={<AdminDashboard />} />
                <Route path="/admin/estoque" element={<AdminDashboard />} />
                <Route path="/admin/clientes" element={<CustomersPage />} />
                <Route path="/admin/financeiro/relatorios" element={<FinancePage />} />
                <Route path="/admin/financeiro/faturamento" element={<FinancePage />} />
                <Route path="/admin/financeiro/pagamentos" element={<FinancePage />} />
                <Route path="/admin/configuracoes" element={<SettingsPage />} />
              </Route>
              
              {/* Admin logout route */}
              <Route path="/admin/logout" element={<AdminLogout />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CheckoutProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
