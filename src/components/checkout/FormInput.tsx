
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  icon,
  placeholder,
  value,
  onChange,
  error,
  type = 'text'
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
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`pl-10 border-imperio-navy/20 bg-white shadow-md rounded-xl transition-all hover:border-imperio-navy/40 focus:ring-imperio-navy/30 relative overflow-hidden ${error ? 'border-imperio-red' : ''}`}
          value={value}
          onChange={onChange}
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
