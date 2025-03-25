
import React from 'react';
import { Info, ShieldCheck } from 'lucide-react';
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

interface InsuranceOptionCardProps {
  hasInsurance: boolean;
  setHasInsurance: (checked: boolean) => void;
}

export const InsuranceOptionCard: React.FC<InsuranceOptionCardProps> = ({
  hasInsurance,
  setHasInsurance
}) => {
  const [showInsuranceDetails, setShowInsuranceDetails] = React.useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-imperio-navy">Seguro opcional</h2>
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
            onCheckedChange={(checked) => setHasInsurance(checked === true)}
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
                setShowInsuranceDetails(false);
              }}
              className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:w-full"
            >
              Adicionar Seguro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
