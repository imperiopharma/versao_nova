
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Info size={18} className="text-imperio-navy" />
        <h2 className="text-xl font-semibold text-imperio-navy">Como nos conheceu?</h2>
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="howDidYouFindUs" className="mb-1 block font-medium">
          Selecione uma opção
        </Label>
        <Select
          value={customerData.howDidYouFindUs}
          onValueChange={(value) => handleChangeInput('howDidYouFindUs', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma opção (opcional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="friend">Indicação de amigo</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
