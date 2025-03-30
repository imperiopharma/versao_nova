import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-imperio-navy text-white pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Império Pharma</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-imperio-light-blue transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-imperio-light-blue transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/marcas" className="hover:text-imperio-light-blue transition-colors">
                  Nossas Marcas
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-imperio-light-blue transition-colors">
                  Contato
                </Link>
              </li>
              {/* Novo link para calculadora de frete */}
              <li>
                <Link to="/calculadora-frete" className="hover:text-imperio-light-blue transition-colors">
                  Calculadora de Frete
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/medicamentos" className="hover:text-imperio-light-blue transition-colors">
                  Medicamentos
                </Link>
              </li>
              <li>
                <Link to="/categoria/vitaminas" className="hover:text-imperio-light-blue transition-colors">
                  Vitaminas
                </Link>
              </li>
              <li>
                <Link to="/categoria/dermocosmeticos" className="hover:text-imperio-light-blue transition-colors">
                  Dermocosméticos
                </Link>
              </li>
              <li>
                <Link to="/categoria/higiene-pessoal" className="hover:text-imperio-light-blue transition-colors">
                  Higiene Pessoal
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Atendimento ao Cliente</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-imperio-light-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-imperio-light-blue transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="hover:text-imperio-light-blue transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/trocas-e-devolucoes" className="hover:text-imperio-light-blue transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center hover:text-imperio-light-blue transition-colors">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-imperio-light-blue transition-colors">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-imperio-light-blue transition-colors">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-imperio-light-blue transition-colors">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Império Pharma. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2">
            *Imagens meramente ilustrativas. Consulte sempre um profissional de saúde.
          </p>
        </div>
      </div>
    </footer>
  );
};
