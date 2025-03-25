
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
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
      <Button
        variant="outline"
        asChild
        className="sm:order-1 border-imperio-navy/30 text-imperio-navy hover:bg-imperio-extra-light-navy transition-all duration-300 rounded-xl group relative overflow-hidden"
      >
        <Link to={backLink}>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative z-10 flex items-center">
            <ChevronLeft size={18} className="mr-2" />
            <span>{backText}</span>
          </span>
        </Link>
      </Button>
      
      <Button 
        onClick={onContinue}
        className="bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy hover:brightness-110 text-white sm:order-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 -translate-x-full animate-shimmer"></span>
        <span className="relative z-10 flex items-center">
          <span>{continueText}</span>
          <ChevronRight size={18} className="ml-2" />
        </span>
      </Button>
    </div>
  );
};
