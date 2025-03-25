
import React from 'react';
import { Search, Users } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg border border-imperio-navy/5 p-6 mb-8 transition-all duration-300 hover:shadow-xl overflow-hidden relative">
      {/* Elemento decorativo - linha diagonal nas cores do Paraguai */}
      <div className="absolute -right-10 -top-10 w-20 h-40 bg-gradient-to-b from-red-500 via-white to-blue-500 rotate-45 opacity-20 rounded-full blur-md"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy p-3 rounded-xl shadow-md">
          <Search size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
            Como nos conheceu?
          </h2>
          <p className="text-xs text-imperio-navy/60 mt-1">Sua resposta nos ajuda a melhorar</p>
        </div>
      </div>
      
      <div className="space-y-4 relative z-10">
        <div className="relative">
          <div className="absolute -z-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl -right-10 -bottom-10"></div>
          <Label htmlFor="howDidYouFindUs" className="mb-2 block font-medium text-imperio-navy/80 flex items-center">
            <Users size={16} className="mr-2 text-imperio-navy/60" />
            Selecione uma opção
          </Label>
          <Select
            value={customerData.howDidYouFindUs}
            onValueChange={(value) => handleChangeInput('howDidYouFindUs', value)}
          >
            <SelectTrigger className="border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy to-transparent opacity-10 rounded-xl"></span>
              <SelectValue placeholder="Escolha uma opção (opcional)" />
            </SelectTrigger>
            <SelectContent className="bg-white border-imperio-navy/20 rounded-xl overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-imperio-extra-light-navy/30 pointer-events-none"></div>
              <SelectItem value="google" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg">
                <div className="flex items-center">
                  <span className="text-imperio-navy font-medium">Google</span>
                </div>
              </SelectItem>
              <SelectItem value="instagram" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg">
                <div className="flex items-center">
                  <span className="text-imperio-navy font-medium">Instagram</span>
                </div>
              </SelectItem>
              <SelectItem value="facebook" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg">
                <div className="flex items-center">
                  <span className="text-imperio-navy font-medium">Facebook</span>
                </div>
              </SelectItem>
              <SelectItem value="friend" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg">
                <div className="flex items-center">
                  <span className="text-imperio-navy font-medium">Indicação de amigo</span>
                </div>
              </SelectItem>
              <SelectItem value="other" className="focus:bg-imperio-extra-light-navy rounded-lg">
                <div className="flex items-center">
                  <span className="text-imperio-navy font-medium">Outro</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
