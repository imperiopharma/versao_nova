
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-imperio-navy text-white py-12 mt-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="text-sm text-gray-300 mt-4 max-w-xs">
              Sua fonte confiável para suplementos e produtos farmacêuticos de alta qualidade.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-imperio-red transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-imperio-red transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-imperio-red transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marcas" className="text-gray-300 hover:text-white transition-colors">
                  Marcas
                </Link>
              </li>
              <li>
                <Link to="/fretes" className="text-gray-300 hover:text-white transition-colors">
                  Informações de Frete
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-gray-300 hover:text-white transition-colors">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Minha Conta
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="block">WhatsApp:</span>
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="text-gray-300">
                <span className="block">Email:</span>
                <a href="mailto:contato@imperiopharma.com.br" className="hover:text-white transition-colors">
                  contato@imperiopharma.com.br
                </a>
              </li>
              <li className="text-gray-300">
                <span className="block">Horário de Atendimento:</span>
                <span>Segunda a Sexta: 9h às 18h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Império Pharma. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Os produtos vendidos no site são destinados exclusivamente para maiores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  );
};
