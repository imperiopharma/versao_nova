
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface CouponStatusBadgeProps {
  isActive: boolean;
}

export const CouponStatusBadge: React.FC<CouponStatusBadgeProps> = ({ isActive }) => {
  return isActive ? (
    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center w-fit">
      <CheckCircle className="h-3 w-3" />
      <span>Ativo</span>
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 flex gap-1 items-center w-fit">
      <XCircle className="h-3 w-3" />
      <span>Inativo</span>
    </Badge>
  );
};
