
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const RecentOrders: React.FC = () => {
  // Mock data for recent orders
  const orders = [
    {
      id: "ORD-7352",
      customer: "João Silva",
      date: "2023-06-14",
      total: "R$ 289,90",
      status: "Concluído",
      statusColor: "success"
    },
    {
      id: "ORD-7351",
      customer: "Maria Oliveira",
      date: "2023-06-14",
      total: "R$ 129,00",
      status: "Enviado",
      statusColor: "info"
    },
    {
      id: "ORD-7350",
      customer: "Pedro Santos",
      date: "2023-06-13",
      total: "R$ 499,50",
      status: "Processando",
      statusColor: "warning"
    },
    {
      id: "ORD-7349",
      customer: "Ana Costa",
      date: "2023-06-13",
      total: "R$ 59,90",
      status: "Concluído",
      statusColor: "success"
    },
    {
      id: "ORD-7348",
      customer: "Lucas Ferreira",
      date: "2023-06-12",
      total: "R$ 329,00",
      status: "Cancelado",
      statusColor: "destructive"
    }
  ];

  // Function to render status badge with appropriate color
  const renderStatus = (status: string, color: string) => {
    const colorMap: Record<string, string> = {
      success: "bg-green-100 text-green-800 hover:bg-green-100",
      info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      destructive: "bg-red-100 text-red-800 hover:bg-red-100"
    };
    
    return (
      <Badge variant="outline" className={`${colorMap[color]} border-none`}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  {renderStatus(order.status, order.statusColor)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost">Ver Todos os Pedidos</Button>
      </CardFooter>
    </Card>
  );
};
