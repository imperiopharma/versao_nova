
import React, { forwardRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  maskChar?: string;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  onValueChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  (
    {
      className,
      type,
      mask,
      maskChar = '_',
      formatChars = {
        '9': '[0-9]',
        'a': '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      },
      alwaysShowMask = false,
      onChange,
      onValueChange,
      value: propValue = '',
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(propValue as string || '');
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (propValue !== undefined) {
        setValue(formatValue(propValue as string));
      }
    }, [propValue]);

    // Aplicar a máscara ao valor
    const formatValue = (val: string): string => {
      if (!mask) return val;

      const cleanValue = val.replace(/\D/g, '');
      let result = '';
      let cleanIndex = 0;

      // Percorre a máscara caractere por caractere
      for (let i = 0; i < mask.length && cleanIndex < cleanValue.length; i++) {
        const maskChar = mask[i];
        
        if (maskChar in formatChars) {
          // Se o caractere da máscara é um espaço para valor
          result += cleanValue[cleanIndex];
          cleanIndex++;
        } else {
          // Se o caractere da máscara é um separador
          result += maskChar;
        }
      }

      return result;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Remove caracteres não permitidos pela máscara
      let processedValue = inputValue;
      
      if (mask) {
        // Formata o valor de acordo com a máscara
        processedValue = formatValue(processedValue);
      }
      
      setValue(processedValue);
      
      // Extrai apenas os dígitos para o valor limpo
      const cleanValue = processedValue.replace(/\D/g, '');
      
      // Chama o callback onChange original, se existir
      if (onChange) {
        onChange(e);
      }
      
      // Chama o callback onValueChange, se existir
      if (onValueChange) {
        onValueChange(cleanValue, e);
      }
    };

    return (
      <Input
        type={type}
        className={cn(className)}
        ref={(node) => {
          // Forward the ref
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          
          inputRef.current = node;
        }}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

InputMask.displayName = 'InputMask';
