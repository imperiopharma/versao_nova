
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseDataListProps<T> {
  initialData: T[];
  searchFields: (keyof T)[];
}

export function useDataList<T extends { id: number | string }>({
  initialData,
  searchFields,
}: UseDataListProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditItem = (item: T) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (itemId: number | string) => {
    setData(data.filter(item => item.id !== itemId));
    
    toast({
      title: "Item excluído",
      description: "O item foi excluído com sucesso.",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return searchFields.some(field => {
      const value = String(item[field]).toLowerCase();
      return value.includes(searchLower);
    });
  });

  return {
    data,
    setData,
    searchQuery,
    selectedItem,
    isDialogOpen,
    filteredData,
    handleEditItem,
    handleDeleteItem,
    handleSearchChange,
    setIsDialogOpen,
    setSelectedItem,
  };
}
