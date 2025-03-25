
import React from 'react';
import { Sparkles } from 'lucide-react';
import { InputMask } from '@/components/ui/input-mask';

interface FormInputMaskProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  mask: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const FormInputMask: React.FC<FormInputMaskProps> = ({
  id,
  label,
  icon,
  placeholder,
  mask,
  value,
  onValueChange,
  error
}) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium text-imperio-navy/80 flex items-center">
        {icon}
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-imperio-navy/40">
          {icon}
        </div>
        <InputMask
          id={id}
          placeholder={placeholder}
          mask={mask}
          className={`pl-10 border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden ${error ? 'border-imperio-red' : ''}`}
          value={value}
          onValueChange={onValueChange}
        />
        <span className="absolute inset-0 bg-gradient-to-r from-imperio-extra-light-navy to-transparent opacity-10 rounded-xl pointer-events-none"></span>
      </div>
      {error && (
        <p className="text-imperio-red text-sm mt-1 flex items-center">
          <Sparkles size={14} className="mr-1 text-imperio-red" />
          {error}
        </p>
      )}
    </div>
  );
};
