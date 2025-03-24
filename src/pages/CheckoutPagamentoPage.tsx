
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, Copy, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

export const CheckoutPagamentoPage: React.FC = () => {
  const { 
    customerData, 
    paymentProofFile, 
    setPaymentProofFile, 
    setCheckoutStep,
    resetCustomerData
  } = useCheckout();
  
  const { 
    items, 
    total,
    clearCart
  } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user came from previous steps
  useEffect(() => {
    if (!customerData.name || !customerData.email || items.length === 0) {
      navigate('/checkout/resumo');
    }
  }, [customerData, items, navigate]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProofFile(e.target.files[0]);
    }
  };
  
  const handleCopyPixKey = () => {
    // Mock PIX key for the example
    const pixKey = 'imperio.pharma@exemplo.com.br';
    navigator.clipboard.writeText(pixKey);
    
    toast({
      title: 'Chave PIX copiada!',
      description: 'Cole a chave no seu aplicativo de banco para realizar o pagamento.',
      duration: 3000,
    });
  };
  
  const handleCompleteOrder = async () => {
    if (!paymentProofFile) {
      toast({
        title: 'Comprovante necessário',
        description: 'Por favor, anexe o comprovante do PIX para finalizar o pedido.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would:
      // 1. Upload the proof file to Supabase Storage
      // 2. Create an order record in Supabase
      // 3. Send notification to the store owner via webhook
      
      // Success!
      setCompletedOrder(true);
      
      // Reset states
      setTimeout(() => {
        clearCart();
        resetCustomerData();
        setCheckoutStep(1);
        navigate('/');
      }, 5000);
      
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: 'Erro ao processar pedido',
        description: 'Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-8">
          <CheckoutSteps currentStep={4} />
        </div>
        
        <h1 className="text-3xl font-semibold text-imperio-navy mb-8">Pagamento via PIX</h1>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium mb-3">Total a Pagar</h2>
              <p className="text-3xl font-semibold text-imperio-navy">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            
            <div className="bg-imperio-extra-light-navy rounded-lg p-6 mb-6">
              <h3 className="font-medium mb-3">Chave PIX</h3>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-imperio-navy/20">
                <p className="font-mono truncate">imperio.pharma@exemplo.com.br</p>
                <Button size="sm" variant="ghost" onClick={handleCopyPixKey}>
                  <Copy size={18} />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Clique no botão ao lado para copiar a chave PIX.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Instruções</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li>Abra o aplicativo do seu banco</li>
                  <li>Selecione a opção PIX</li>
                  <li>Cole a chave PIX copiada acima</li>
                  <li>Digite o valor exato do pedido</li>
                  <li>Confirme o pagamento e salve o comprovante</li>
                  <li>Anexe o comprovante abaixo</li>
                </ol>
              </div>
              
              <div>
                <Label htmlFor="file-upload" className="block font-medium mb-3">
                  Envie o comprovante do PIX
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-imperio-navy transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  
                  {paymentProofFile ? (
                    <div className="text-imperio-navy">
                      <CheckCircle size={36} className="mx-auto mb-2" />
                      <p className="font-medium">{paymentProofFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(paymentProofFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button 
                        className="mt-3"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPaymentProofFile(null);
                        }}
                      >
                        Escolher outro
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload size={36} className="mx-auto mb-2" />
                      <p className="font-medium">Clique para anexar comprovante</p>
                      <p className="text-sm">PNG, JPG ou PDF (max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              asChild
              className="sm:order-1"
              disabled={loading}
            >
              <Link to="/checkout/resumo">
                <ChevronLeft size={18} className="mr-2" />
                Voltar ao Resumo
              </Link>
            </Button>
            
            <Button 
              onClick={handleCompleteOrder}
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:order-2"
              disabled={!paymentProofFile || loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Processando...
                </>
              ) : (
                'Finalizar Pedido'
              )}
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mr-3" size={20} />
              <p className="text-sm text-yellow-800">
                Importante: O pedido só será processado após a confirmação do pagamento.
                Você receberá um aviso por WhatsApp quando o pagamento for verificado.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Completed Dialog */}
      <Dialog open={completedOrder} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-imperio-navy text-center text-2xl">
              Pedido realizado com sucesso! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              Seus dados foram enviados e em breve nossa equipe entrará em contato.
              Você receberá a confirmação pelo WhatsApp.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <p className="font-medium">
              Obrigado por comprar na Império Pharma!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Você será redirecionado para a página inicial em instantes...
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full"
              onClick={() => {
                clearCart();
                resetCustomerData();
                setCheckoutStep(1);
                navigate('/');
              }}
            >
              Voltar à Página Inicial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
