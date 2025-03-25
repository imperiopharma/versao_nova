
import React from 'react';
import { Search, Users, Instagram, Facebook, Globe, UserPlus, Radio } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg border border-imperio-navy/5 p-6 mb-8 transition-all duration-300 hover:shadow-xl overflow-hidden relative group">
      {/* Elementos decorativos - linha diagonal nas cores do Paraguai */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-b from-red-500 via-white to-blue-500 rotate-45 opacity-10 rounded-full blur-md transform transition-transform duration-500 group-hover:rotate-90"></div>
      
      {/* Efeito de partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy p-3 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <Search size={22} className="text-white relative z-10" />
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
            <SelectContent className="bg-white/95 backdrop-blur-md border-imperio-navy/20 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-imperio-extra-light-navy/30 pointer-events-none"></div>
              
              <SelectItem value="google" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg group">
                <div className="flex items-center">
                  <Globe size={16} className="mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-imperio-navy font-medium">Google</span>
                </div>
              </SelectItem>
              
              <SelectItem value="instagram" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg group">
                <div className="flex items-center">
                  <Instagram size={16} className="mr-2 text-pink-600 group-hover:scale-110 transition-transform" />
                  <span className="text-imperio-navy font-medium">Instagram</span>
                </div>
              </SelectItem>
              
              <SelectItem value="facebook" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg group">
                <div className="flex items-center">
                  <Facebook size={16} className="mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-imperio-navy font-medium">Facebook</span>
                </div>
              </SelectItem>
              
              <SelectItem value="friend" className="focus:bg-imperio-extra-light-navy mb-1 rounded-lg group">
                <div className="flex items-center">
                  <UserPlus size={16} className="mr-2 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="text-imperio-navy font-medium">Indicação de amigo</span>
                </div>
              </SelectItem>
              
              <SelectItem value="other" className="focus:bg-imperio-extra-light-navy rounded-lg group">
                <div className="flex items-center">
                  <Radio size={16} className="mr-2 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="text-imperio-navy font-medium">Outro</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Efeito de brilho ao passar o mouse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </div>
  );
};
