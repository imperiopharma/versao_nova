
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemType?: 'produto' | 'marca' | 'categoria';
}

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  itemType = 'produto'
}) => {
  const getTitle = () => {
    switch (itemType) {
      case 'marca': return 'Confirmar exclusão de marca';
      case 'categoria': return 'Confirmar exclusão de categoria';
      default: return 'Confirmar exclusão de produto';
    }
  };

  const getMessage = () => {
    switch (itemType) {
      case 'marca': return 'Tem certeza que deseja excluir esta marca? Esta ação não pode ser desfeita.';
      case 'categoria': return 'Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.';
      default: return 'Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          <AlertDialogDescription>
            {getMessage()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
