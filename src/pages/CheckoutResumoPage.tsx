
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps';
import { ChevronLeft, ChevronRight, Edit2, ShieldCheck, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';

export const CheckoutResumoPage: React.FC = () => {
  const { 
    customerData, 
    setCheckoutStep 
  } = useCheckout();
  
  const { 
    items, 
    subtotal, 
    discount, 
    shippingMethod, 
    shippingCost, 
    total,
    hasInsurance,
    setHasInsurance 
  } = useCart();
  
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false);
  const [insuranceChoice, setInsuranceChoice] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
  // Check if user came from previous step
  useEffect(() => {
    if (!customerData.name || !customerData.email || !shippingMethod) {
      navigate('/checkout/dados');
    }
  }, [customerData, navigate, shippingMethod]);
  
  const getShippingMethodDisplay = () => {
    switch (shippingMethod) {
      case 'sedex':
        return 'Sedex';
      case 'pac':
        return 'PAC';
      case 'transportadora':
        return 'Transportadora';
      default:
        return 'Não selecionado';
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setInsuranceChoice(checked);
    setHasInsurance(checked);
  };
  
  const handleContinue = () => {
    if (insuranceChoice === null) {
      // User must make an explicit choice about insurance
      return;
    }
    
    setCheckoutStep(4);
    navigate('/checkout/pagamento');
  };
  
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mb-8">
          <CheckoutSteps currentStep={3} />
        </div>
        
        <h1 className="text-3xl font-semibold text-imperio-navy mb-8">Resumo do Pedido</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-medium">Endereço de Entrega</h2>
              <Button variant="ghost" size="sm" className="text-imperio-navy" asChild>
                <Link to="/checkout/dados">
                  <Edit2 size={18} className="mr-2" />
                  Editar
                </Link>
              </Button>
            </div>
            
            <div className="bg-imperio-extra-light-navy rounded-lg p-4">
              <p className="font-medium">{customerData.name}</p>
              <p>{customerData.street}, {customerData.number}</p>
              {customerData.complement && <p>{customerData.complement}</p>}
              <p>{customerData.neighborhood}, {customerData.city} - {customerData.state}</p>
              <p>CEP: {customerData.cep}</p>
              <div className="mt-3 pt-3 border-t border-imperio-navy/10">
                <p>CPF: {customerData.cpf}</p>
                <p>WhatsApp: {customerData.whatsapp}</p>
                <p>Email: {customerData.email}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-medium">Frete escolhido</h2>
              <Button variant="ghost" size="sm" className="text-imperio-navy" asChild>
                <Link to="/checkout/dados">
                  <Edit2 size={18} className="mr-2" />
                  Editar
                </Link>
              </Button>
            </div>
            
            <div className="bg-imperio-extra-light-navy rounded-lg p-4">
              <p>
                <span className="font-medium">{getShippingMethodDisplay()}</span>
                {' – '}
                <span>
                  {shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">Itens do pedido</h2>
            
            <div className="max-h-60 overflow-y-auto mb-4 pr-2">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-sm">
                      Quantidade: {item.quantity} × {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Desconto</span>
                  <span>-{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}
              
              <div className="flex justify-between mb-2">
                <span>Frete</span>
                <span>{shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              
              <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-medium">Seguro opcional</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-imperio-navy"
                onClick={() => setShowInsuranceDetails(true)}
              >
                <Info size={18} className="mr-2" />
                Detalhes
              </Button>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border border-imperio-navy/20 rounded-lg bg-imperio-extra-light-navy">
              <Checkbox 
                id="insurance" 
                checked={hasInsurance}
                onCheckedChange={handleCheckboxChange}
                className="mt-1"
              />
              <div>
                <label htmlFor="insurance" className="font-medium cursor-pointer">
                  Adicionar Seguro de Envio (+20% do valor total)
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Protege seu pedido contra extravio ou avarias durante o transporte.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              asChild
              className="sm:order-1"
            >
              <Link to="/checkout/dados">
                <ChevronLeft size={18} className="mr-2" />
                Editar Dados
              </Link>
            </Button>
            
            <Button 
              onClick={handleContinue}
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:order-2"
              disabled={insuranceChoice === null}
            >
              Ir para Pagamento
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
          
          {insuranceChoice === null && (
            <p className="text-imperio-red text-sm text-center mt-4">
              Por favor, selecione se deseja ou não o seguro de envio para continuar.
            </p>
          )}
        </div>
      </div>
      
      <Dialog open={showInsuranceDetails} onOpenChange={setShowInsuranceDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Seguro de Envio</DialogTitle>
            <DialogDescription>
              Informações sobre a cobertura do seguro para seu pedido.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-imperio-navy flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-medium">O que cobre?</h3>
                <p className="text-sm text-gray-600">
                  O seguro cobre extravio, roubo, furto e danos físicos às mercadorias durante o transporte.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-imperio-navy flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-medium">Valor do seguro</h3>
                <p className="text-sm text-gray-600">
                  O valor do seguro é de 20% sobre o valor total do pedido (subtotal + frete).
                  Em caso de sinistro, o valor total é reembolsado ou um novo produto é enviado.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-imperio-navy flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-medium">Como acionar?</h3>
                <p className="text-sm text-gray-600">
                  Em caso de problemas, entre em contato conosco em até 7 dias após a 
                  data prevista de entrega, com fotos da embalagem (se recebida danificada) 
                  ou comprovante de não recebimento.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowInsuranceDetails(false)}
              className="sm:w-full"
            >
              Fechar
            </Button>
            <Button 
              onClick={() => {
                setHasInsurance(true);
                setInsuranceChoice(true);
                setShowInsuranceDetails(false);
              }}
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:w-full"
            >
              Adicionar Seguro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
