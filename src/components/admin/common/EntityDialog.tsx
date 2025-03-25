
import React, { ReactNode } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EntityDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  children: ReactNode;
}

export const EntityDialog: React.FC<EntityDialogProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  submitButtonText,
  children
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            {children}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit">{submitButtonText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
