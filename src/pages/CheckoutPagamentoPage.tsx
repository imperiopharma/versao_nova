
import React, { useEffect, useRef } from 'react';
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
import { useCheckoutSubmit } from '@/hooks/useCheckoutSubmit';

export const CheckoutPagamentoPage: React.FC = () => {
  const { 
    customerData, 
    paymentProofFile, 
    setPaymentProofFile, 
    setCheckoutStep,
    resetCustomerData
  } = useCheckout();
  
  const { items, total, clearCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    handleCompleteOrder,
    loading,
    completedOrder,
    setCompletedOrder
  } = useCheckoutSubmit();
  
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

  // SVG do logo PIX
  const PixLogo = () => (
    <svg width="48" height="48" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_2)">
        <path d="M206.792 0H49.208C22.03 0 0 22.03 0 49.208V206.792C0 233.97 22.03 256 49.208 256H206.792C233.97 256 256 233.97 256 206.792V49.208C256 22.03 233.97 0 206.792 0Z" fill="white"/>
        <path d="M192.885 58.024L168.063 33.202C161.735 26.873 151.151 26.873 144.822 33.202L119.042 58.982L141.035 80.976L192.885 29.126C199.214 22.797 199.214 12.214 192.885 5.885C186.557 -0.444 175.973 -0.444 169.644 5.885L79.123 96.407C76.308 99.222 76.308 103.806 79.123 106.622L105.621 133.119C108.436 135.935 113.02 135.935 115.836 133.119L192.885 58.024Z" fill="#32BCAD"/>
        <path d="M79.123 159.593L135.98 102.736L113.986 80.742L57.129 137.599C50.8 143.928 50.8 154.511 57.129 160.84C63.458 167.169 74.041 167.169 80.37 160.84L169.644 69.593C172.46 66.778 176.976 66.778 179.86 69.593L206.357 96.091C209.173 98.906 209.173 103.491 206.357 106.306L115.836 197.876C109.507 204.204 109.507 214.788 115.836 221.117C122.165 227.446 132.748 227.446 139.077 221.117L192.885 167.309L170.892 145.315L117.083 197.876C114.268 200.691 109.683 200.691 106.868 197.876L80.37 171.378C77.554 168.562 77.554 163.978 80.37 161.162L166.862 74.67C173.191 68.341 173.191 57.757 166.862 51.429C160.533 45.1 149.95 45.1 143.621 51.429L63.458 131.592C57.129 137.921 57.129 148.505 63.458 154.834C69.787 161.162 80.37 161.162 86.699 154.834L130.37 111.163L108.377 89.169L65.048 132.498C62.233 135.314 57.648 135.314 54.832 132.498L28.335 106.001C25.52 103.185 25.52 98.601 28.335 95.785L79.123 43.024Z" fill="#32BCAD"/>
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="256" height="256" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
  
  return (
    <Layout>
      <div className="section-container py-8">
        <div className="mb-6">
          <CheckoutSteps currentStep={4} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-imperio-navy mb-6">Pagamento via PIX</h1>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-elevation p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <PixLogo />
              <h2 className="text-2xl font-medium mt-3 mb-1">Total a Pagar</h2>
              <p className="text-3xl font-semibold text-imperio-navy">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-imperio-navy/10">
              <h3 className="font-medium text-imperio-navy mb-3 flex items-center">
                <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M192.885 58.024L168.063 33.202C161.735 26.873 151.151 26.873 144.822 33.202L119.042 58.982L141.035 80.976L192.885 29.126C199.214 22.797 199.214 12.214 192.885 5.885C186.557 -0.444 175.973 -0.444 169.644 5.885L79.123 96.407C76.308 99.222 76.308 103.806 79.123 106.622L105.621 133.119C108.436 135.935 113.02 135.935 115.836 133.119L192.885 58.024Z" fill="#001f3f"/>
                  <path d="M79.123 159.593L135.98 102.736L113.986 80.742L57.129 137.599C50.8 143.928 50.8 154.511 57.129 160.84C63.458 167.169 74.041 167.169 80.37 160.84L169.644 69.593C172.46 66.778 176.976 66.778 179.86 69.593L206.357 96.091C209.173 98.906 209.173 103.491 206.357 106.306L115.836 197.876C109.507 204.204 109.507 214.788 115.836 221.117C122.165 227.446 132.748 227.446 139.077 221.117L192.885 167.309L170.892 145.315L117.083 197.876C114.268 200.691 109.683 200.691 106.868 197.876L80.37 171.378C77.554 168.562 77.554 163.978 80.37 161.162L166.862 74.67C173.191 68.341 173.191 57.757 166.862 51.429C160.533 45.1 149.95 45.1 143.621 51.429L63.458 131.592C57.129 137.921 57.129 148.505 63.458 154.834C69.787 161.162 80.37 161.162 86.699 154.834L130.37 111.163L108.377 89.169L65.048 132.498C62.233 135.314 57.648 135.314 54.832 132.498L28.335 106.001C25.52 103.185 25.52 98.601 28.335 95.785L79.123 43.024Z" fill="#001f3f"/>
                </svg>
                Chave PIX
              </h3>
              <div className="flex items-center justify-between bg-white p-4 rounded-md border border-imperio-navy/20">
                <p className="font-mono text-sm md:text-base break-all">imperio.pharma@exemplo.com.br</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCopyPixKey}
                  className="ml-2 flex-shrink-0 text-imperio-navy border-imperio-navy/20 hover:bg-imperio-navy/10"
                >
                  <Copy size={18} />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Clique no botão ao lado para copiar a chave PIX.
              </p>
            </div>
            
            <div className="space-y-5">
              <div>
                <h3 className="font-medium text-imperio-navy mb-3">Instruções</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li>Abra o aplicativo do seu banco</li>
                  <li>Selecione a opção PIX</li>
                  <li>Cole a chave PIX copiada acima</li>
                  <li>Digite o valor exato do pedido: <span className="font-medium">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></li>
                  <li>Confirme o pagamento e salve o comprovante</li>
                  <li>Anexe o comprovante abaixo</li>
                </ol>
              </div>
              
              <div>
                <Label htmlFor="file-upload" className="block font-medium mb-3 text-imperio-navy">
                  Envie o comprovante do PIX
                </Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-imperio-navy transition-colors cursor-pointer ${
                    paymentProofFile ? 'border-imperio-navy/50 bg-imperio-extra-light-navy' : 'border-gray-300'
                  }`} 
                  onClick={() => fileInputRef.current?.click()}
                >
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
                      <CheckCircle size={40} className="mx-auto mb-3" />
                      <p className="font-medium text-lg">{paymentProofFile.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {(paymentProofFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button 
                        className="mt-4 bg-imperio-navy hover:bg-imperio-light-navy"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPaymentProofFile(null);
                        }}
                      >
                        Escolher outro arquivo
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload size={40} className="mx-auto mb-3" />
                      <p className="font-medium">Clique para anexar comprovante</p>
                      <p className="text-sm mt-1">PNG, JPG ou PDF (max 10MB)</p>
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
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mr-3 mt-1" size={20} />
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> O pedido só será processado após a confirmação do pagamento.
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
              className="w-full bg-imperio-navy hover:bg-imperio-light-navy"
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
