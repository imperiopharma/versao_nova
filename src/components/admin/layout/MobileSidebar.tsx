
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarMenu } from './SidebarMenu';
import { Menu } from 'lucide-react';

interface MobileSidebarProps {
  title: string;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ title }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b p-4 flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-4">
            <span className="sr-only">Abrir menu</span>
            <Menu size={20} />
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
