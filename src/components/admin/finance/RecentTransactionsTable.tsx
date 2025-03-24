
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface Transaction {
  id: string;
  descricao: string;
  tipo: 'receita' | 'despesa';
  valor: number;
  data: string;
  metodo: string;
}

export const RecentTransactionsTable: React.FC = () => {
  // Transações recentes
  const recentTransactions: Transaction[] = [
    { id: 'TX001', descricao: 'Venda #12345', tipo: 'receita', valor: 289.90, data: '15/06/2023', metodo: 'PIX' },
    { id: 'TX002', descricao: 'Pagamento Fornecedor', tipo: 'despesa', valor: 3500.00, data: '14/06/2023', metodo: 'Transferência' },
    { id: 'TX003', descricao: 'Venda #12346', tipo: 'receita', valor: 435.50, data: '14/06/2023', metodo: 'PIX' },
    { id: 'TX004', descricao: 'Despesa Marketing', tipo: 'despesa', valor: 1800.00, data: '13/06/2023', metodo: 'Cartão' },
    { id: 'TX005', descricao: 'Venda #12347', tipo: 'receita', valor: 189.99, data: '13/06/2023', metodo: 'PIX' },
    { id: 'TX006', descricao: 'Venda #12348', tipo: 'receita', valor: 649.90, data: '12/06/2023', metodo: 'PIX' },
    { id: 'TX007', descricao: 'Envio de Pedidos', tipo: 'despesa', valor: 350.00, data: '12/06/2023', metodo: 'Cartão' },
  ];
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="p-4 md:p-6 pb-2">
        <CardTitle className="text-base md:text-lg">Transações Recentes</CardTitle>
        <CardDescription>Últimas movimentações financeiras</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-1 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[100px]">Data</TableHead>
              <TableHead className="w-[100px] hidden sm:table-cell">Método</TableHead>
              <TableHead className="text-right w-[120px]">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell className="truncate max-w-[150px] sm:max-w-none">{transaction.descricao}</TableCell>
                <TableCell>{transaction.data}</TableCell>
                <TableCell className="hidden sm:table-cell">{transaction.metodo}</TableCell>
                <TableCell className={`text-right ${transaction.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.tipo === 'receita' ? '+' : '-'} {formatCurrency(transaction.valor)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        <Button variant="ghost" size="sm">Ver Todas as Transações</Button>
      </CardFooter>
    </Card>
  );
};
