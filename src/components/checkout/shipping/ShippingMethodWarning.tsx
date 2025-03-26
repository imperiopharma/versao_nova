
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ShippingMethodWarning: React.FC = () => {
  return (
    <Alert className="mt-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm border border-yellow-200/70 shadow-sm">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-sm text-amber-800">
        Os prazos de entrega são estimados e podem variar de acordo com a região e disponibilidade.
      </AlertDescription>
    </Alert>
  );
};
