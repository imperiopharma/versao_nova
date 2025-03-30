
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PixKeyDisplay: React.FC = () => {
  const { toast } = useToast();
  
  const handleCopyPixKey = () => {
    // Mock PIX key for the example
    const pixKey = 'imperio.pharma@exemplo.com.br';
    navigator.clipboard.writeText(pixKey);
    
    toast({
      title: 'Chave PIX copiada!',
      description: 'Cole a chave no seu aplicativo de banco para realizar o pagamento.',
      duration: 3000,
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-imperio-navy/10">
      <h3 className="font-medium text-imperio-navy mb-3 flex items-center">
        <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M192.885 58.024L168.063 33.202C161.735 26.873 151.151 26.873 144.822 33.202L119.042 58.982L141.035 80.976L192.885 29.126C199.214 22.797 199.214 12.214 192.885 5.885C186.557 -0.444 175.973 -0.444 169.644 5.885L79.123 96.407C76.308 99.222 76.308 103.806 79.123 106.622L105.621 133.119C108.436 135.935 113.02 135.935 115.836 133.119L192.885 58.024Z" fill="#001f3f"/>
          <path d="M79.123 159.593L135.98 102.736L113.986 80.742L57.129 137.599C50.8 143.928 50.8 154.511 57.129 160.84C63.458 167.169 74.041 167.169 80.37 160.84L169.644 69.593C172.46 66.778 176.976 66.778 179.86 69.593L206.357 96.091C209.173 98.906 209.173 103.491 206.357 106.306L115.836 197.876C109.507 204.204 109.507 214.788 115.836 221.117C122.165 227.446 132.748 227.446 139.077 221.117L192.885 167.309L170.892 145.315L117.083 197.876C114.268 200.691 109.683 200.691 106.868 197.876L80.37 171.378C77.554 168.562 77.554 163.978 80.37 161.162L166.862 74.67C173.191 68.341 173.191 57.757 166.862 51.429C160.533 45.1 149.95 45.1 143.621 51.429L63.458 131.592C57.129 137.921 57.129 148.505 63.458 154.834C69.787 161.162 80.37 161.162 86.699 154.834L130.37 111.163L108.377 89.169L65.048 132.498C62.233 135.314 57.648 135.314 54.832 132.498L28.335 106.001C25.52 103.185 25.52 98.601 28.335 95.785L79.123 43.024Z" fill="#001f3f"/>
        </svg>
        Chave PIX
      </h3>
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-imperio-navy/20">
        <p className="font-mono text-sm md:text-base break-all">imperio.pharma@exemplo.com.br</p>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleCopyPixKey}
          className="ml-2 flex-shrink-0 text-imperio-navy border-imperio-navy/20 hover:bg-imperio-navy/10"
        >
          <Copy size={18} />
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-3">
        Clique no botão ao lado para copiar a chave PIX.
      </p>
    </div>
  );
};
