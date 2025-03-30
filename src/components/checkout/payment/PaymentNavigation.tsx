
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentNavigationProps {
  onSubmit: () => void;
  isSubmitDisabled: boolean;
  loading: boolean;
}

export const PaymentNavigation: React.FC<PaymentNavigationProps> = ({ 
  onSubmit, 
  isSubmitDisabled,
  loading
}) => {
  return (
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
        onClick={onSubmit}
        className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:order-2"
        disabled={isSubmitDisabled || loading}
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
  );
};
