
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';

interface CouponValidationMessageProps {
  showValidationMessage: boolean;
  isValid: boolean;
  validationMessage: string;
}

export const CouponValidationMessage: React.FC<CouponValidationMessageProps> = ({
  showValidationMessage,
  isValid,
  validationMessage
}) => {
  if (!showValidationMessage) {
    return null;
  }

  return (
    <Alert variant={isValid ? "default" : "destructive"} className={isValid ? "py-2" : ""}>
      <AlertDescription className={`text-${isValid ? 'xs' : 'sm'} flex items-center`}>
        {isValid ? (
          <Check size={isValid ? 14 : 16} className="mr-1" />
        ) : (
          <AlertCircle size={isValid ? 14 : 16} className="mr-2" />
        )}
        {validationMessage}
      </AlertDescription>
    </Alert>
  );
};
