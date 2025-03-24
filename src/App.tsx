
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
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
              <Route path="/" element={<HomePage />} />
              <Route path="/marca/:brandId" element={<BrandProductsPage />} />
              <Route path="/marcas" element={<MarketplacePage />} />
              <Route path="/fretes" element={<FreightInfoPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/checkout/dados" element={<CheckoutDadosPage />} />
              <Route path="/checkout/resumo" element={<CheckoutResumoPage />} />
              <Route path="/checkout/pagamento" element={<CheckoutPagamentoPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CheckoutProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
