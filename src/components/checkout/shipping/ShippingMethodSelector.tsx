
import React from 'react';
import { PackageCheck, Zap, Truck, Badge } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface ShippingMethodSelectorProps {
  selectedMethod: string | null;
  onMethodChange: (value: string) => void;
  formError?: string;
}

export const ShippingMethodSelector: React.FC<ShippingMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
  formError
}) => {
  return (
    <div>
      <Label htmlFor="shipping-method" className="font-medium mb-2 block">
        Selecione o método de envio *
      </Label>
      <Select
        value={selectedMethod || ""}
        onValueChange={onMethodChange}
      >
        <SelectTrigger className={`border-imperio-navy/20 bg-white/80 backdrop-blur-sm shadow-md rounded-xl transition-all ${formError ? 'border-imperio-red' : ''}`}>
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-lg border-imperio-navy/20 rounded-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-imperio-extra-light-navy/20 pointer-events-none"></div>
          
          <SelectItem value="sedex" className="focus:bg-imperio-extra-light-navy mb-2 rounded-lg group">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Zap size={18} className="mr-2 text-imperio-navy group-hover:scale-110 transition-transform" />
                <span className="text-imperio-navy font-medium">Sedex</span>
              </div>
              <UIBadge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Rápido</UIBadge>
            </div>
          </SelectItem>
          
          <SelectItem value="pac" className="focus:bg-imperio-extra-light-navy mb-2 rounded-lg group">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <PackageCheck size={18} className="mr-2 text-imperio-navy group-hover:scale-110 transition-transform" />
                <span className="text-imperio-navy font-medium">PAC</span>
              </div>
              <UIBadge variant="outline" className="bg-green-50 text-green-700 border-green-200">Econômico</UIBadge>
            </div>
          </SelectItem>
          
          <SelectItem value="transportadora" className="focus:bg-imperio-extra-light-navy rounded-lg group">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Truck size={18} className="mr-2 text-imperio-navy group-hover:scale-110 transition-transform" />
                <span className="text-imperio-navy font-medium">Transportadora</span>
              </div>
              <UIBadge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Robusto</UIBadge>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      {formError && (
        <p className="text-imperio-red text-sm mt-2">{formError}</p>
      )}
    </div>
  );
};
