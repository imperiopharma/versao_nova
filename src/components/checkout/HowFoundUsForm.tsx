
import React from 'react';
import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomerData } from '@/contexts/CheckoutContext';

interface HowFoundUsFormProps {
  customerData: CustomerData;
  handleChangeInput: (field: string, value: string) => void;
}

export const HowFoundUsForm: React.FC<HowFoundUsFormProps> = ({
  customerData,
  handleChangeInput,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-imperio-navy/10 p-6 mb-8 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-imperio-extra-light-navy p-2 rounded-full">
          <Info size={18} className="text-imperio-navy" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
          Como nos conheceu?
        </h2>
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="howDidYouFindUs" className="mb-1 block font-medium text-imperio-navy/80">
          Selecione uma opção
        </Label>
        <Select
          value={customerData.howDidYouFindUs}
          onValueChange={(value) => handleChangeInput('howDidYouFindUs', value)}
        >
          <SelectTrigger className="border-imperio-navy/20 bg-white shadow-sm transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30">
            <SelectValue placeholder="Escolha uma opção (opcional)" />
          </SelectTrigger>
          <SelectContent className="bg-white border-imperio-navy/20">
            <SelectItem value="google" className="focus:bg-imperio-extra-light-navy">Google</SelectItem>
            <SelectItem value="instagram" className="focus:bg-imperio-extra-light-navy">Instagram</SelectItem>
            <SelectItem value="facebook" className="focus:bg-imperio-extra-light-navy">Facebook</SelectItem>
            <SelectItem value="friend" className="focus:bg-imperio-extra-light-navy">Indicação de amigo</SelectItem>
            <SelectItem value="other" className="focus:bg-imperio-extra-light-navy">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
