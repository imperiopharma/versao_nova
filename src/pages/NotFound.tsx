
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Rolar para o topo da página
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-subtle p-8 max-w-md w-full text-center">
        <div className="mb-4 text-imperio-navy">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-imperio-navy">404</h1>
        <p className="text-xl text-gray-600 mb-6">Página não encontrada</p>
        <p className="text-gray-500 mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="w-full md:w-auto bg-imperio-navy hover:bg-imperio-light-navy">
          <Link to="/" className="flex items-center justify-center">
            <Home size={18} className="mr-2" />
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
