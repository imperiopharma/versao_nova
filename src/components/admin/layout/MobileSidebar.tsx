
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarMenu } from './SidebarMenu';

interface MobileSidebarProps {
  title: string;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ title }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b p-4 flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-4">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px] max-w-[80vw]">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-imperio-navy truncate">{title}</h1>
          </div>
          
          <SidebarMenu isMobile={true} />
        </SheetContent>
      </Sheet>
      
      <h1 className="text-xl font-bold text-imperio-navy truncate">{title}</h1>
    </div>
  );
};
