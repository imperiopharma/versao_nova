
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  maskChar?: string;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
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
      value: propValue,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(propValue as string || '');
    const [cleanValue, setCleanValue] = useState<string>('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (propValue !== undefined) {
        setValue(formatValue(propValue as string));
      }
    }, [propValue]);

    const getCleanValue = (val: string): string => {
      if (!mask) return val;
      
      let cleanVal = '';
      let maskIndex = 0;
      
      for (let i = 0; i < val.length && maskIndex < mask.length; i++) {
        const maskChar = mask[maskIndex];
        const valChar = val[i];
        
        if (maskChar in formatChars) {
          if (new RegExp(formatChars[maskChar]).test(valChar)) {
            cleanVal += valChar;
          }
        } else if (maskChar === valChar) {
          // Skip special characters that match the mask
        }
        
        maskIndex++;
      }
      
      return cleanVal;
    };

    const formatValue = (val: string): string => {
      if (!mask) return val;
      
      const clean = getCleanValue(val);
      let formatted = '';
      let cleanIndex = 0;
      
      for (let i = 0; i < mask.length && cleanIndex < clean.length; i++) {
        const maskChar = mask[i];
        
        if (maskChar in formatChars) {
          formatted += clean[cleanIndex];
          cleanIndex++;
        } else {
          formatted += maskChar;
        }
      }
      
      return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const newCleanValue = getCleanValue(newValue);
      const formattedValue = formatValue(newValue);
      
      setValue(formattedValue);
      setCleanValue(newCleanValue);
      
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(newCleanValue, e);
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    );
  }
);

InputMask.displayName = 'InputMask';
