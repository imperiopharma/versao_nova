
import React, { forwardRef, useState, useEffect, useRef } from 'react';
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
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (propValue !== undefined && propValue !== value) {
        setValue(propValue as string);
      }
    }, [propValue]);

    useEffect(() => {
      // Restaurar posição do cursor após render
      if (cursorPosition !== null && inputRef.current) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        setCursorPosition(null);
      }
    }, [cursorPosition, value]);

    // Obter o padrão de máscaras para validação
    const getMaskPattern = () => {
      if (!mask) return null;
      
      const pattern = mask.split('').map(char => {
        if (char in formatChars) {
          return formatChars[char];
        }
        return char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape special chars
      }).join('');
      
      return new RegExp(`^${pattern}$`);
    };

    // Aplicar a máscara ao valor
    const formatValue = (val: string, previousValue: string = ''): string => {
      if (!mask) return val;

      let result = '';
      let inputIndex = 0;
      
      // Limpar qualquer caractere não numérico se a máscara for só de números
      // Isso permite manter letras para máscaras que incluem letras
      const rawValue = mask.includes('9') && !mask.includes('a') && !mask.includes('*') 
        ? val.replace(/\D/g, '')
        : val;
      
      for (let i = 0; i < mask.length && inputIndex < rawValue.length; i++) {
        const maskChar = mask[i];
        
        if (maskChar in formatChars) {
          // Se o caractere da máscara é um placeholder para valor
          const regex = new RegExp(formatChars[maskChar]);
          
          if (inputIndex < rawValue.length) {
            const char = rawValue[inputIndex];
            
            if (regex.test(char)) {
              result += char;
              inputIndex++;
            } else {
              // Se o caractere não corresponde ao padrão, tenta o próximo
              inputIndex++;
              i--; // Repete a mesma posição da máscara
            }
          }
        } else {
          // Se o caractere da máscara é um separador fixo
          result += maskChar;
          
          // Se o próximo caractere do input for igual ao separador, pule-o
          if (inputIndex < rawValue.length && rawValue[inputIndex] === maskChar) {
            inputIndex++;
          }
        }
      }
      
      return result;
    };

    const calculateCursorPosition = (newValue: string, oldValue: string, currentPosition: number): number => {
      // Se estamos adicionando um caractere
      if (newValue.length > oldValue.length) {
        // Verificar se a posição atual está em um separador
        if (mask && currentPosition < mask.length) {
          const nextChar = mask[currentPosition];
          if (!(nextChar in formatChars)) {
            // Se o próximo caractere é um separador, mova o cursor 1 posição à frente
            return currentPosition + 1;
          }
        }
        return currentPosition;
      }
      
      // Se estamos removendo um caractere
      return currentPosition;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputElement = e.target;
      const currentPosition = inputElement.selectionStart || 0;
      const oldValue = value;
      const inputValue = e.target.value;
      
      // Formata o valor de acordo com a máscara
      const formattedValue = formatValue(inputValue, oldValue);
      setValue(formattedValue);
      
      // Calcula a nova posição do cursor
      const newCursorPosition = calculateCursorPosition(formattedValue, oldValue, currentPosition);
      setCursorPosition(newCursorPosition);
      
      // Extrai apenas os dígitos para o valor limpo
      const cleanValue = mask && mask.includes('9') ? formattedValue.replace(/\D/g, '') : formattedValue;
      
      // Chama o callback onChange original, se existir
      if (onChange) {
        const newEvent = { ...e };
        const target = { ...newEvent.target, value: formattedValue };
        newEvent.target = target as typeof newEvent.target;
        onChange(newEvent);
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
