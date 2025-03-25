
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckoutNavigationProps {
  onContinue: () => void;
  backLink: string;
  backText: string;
  continueText: string;
}

export const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({
  onContinue,
  backLink,
  backText,
  continueText
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <Button
        variant="outline"
        asChild
        className="sm:order-1 border-imperio-navy text-imperio-navy hover:bg-imperio-extra-light-navy"
      >
        <Link to={backLink}>
          <ChevronLeft size={18} className="mr-2" />
          {backText}
        </Link>
      </Button>
      
      <Button 
        onClick={onContinue}
        className="bg-imperio-navy hover:bg-imperio-light-navy text-white sm:order-2"
      >
        {continueText}
        <ChevronRight size={18} className="ml-2" />
      </Button>
    </div>
  );
};
