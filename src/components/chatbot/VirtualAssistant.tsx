
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronRight, Info, ShoppingCart, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
  links?: { text: string; url: string }[];
}

export const VirtualAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Olá! Sou o assistente virtual da Imperio Pharma. Como posso ajudar?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Se abrir o chat, adicionar mensagem de boas-vindas se for o primeiro acesso
    if (!isOpen && messages.length === 1) {
      setTimeout(() => {
        setMessages([
          ...messages,
          { 
            text: "Posso ajudar com informações sobre produtos, pedidos, ou localização de nossa loja. O que você precisa?", 
            isUser: false,
            links: [
              { text: "Produtos", url: "/produtos" },
              { text: "Como comprar", url: "/como-comprar" },
              { text: "Contato", url: "/contato" }
            ]
          }
        ]);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === "") return;
    
    // Adicionar mensagem do usuário
    const userMessage = { text: inputValue, isUser: true };
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Processar resposta do assistente
    setTimeout(() => {
      const botResponse = processUserInput(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  // Função para processar a entrada do usuário e retornar uma resposta apropriada
  const processUserInput = (input: string): Message => {
    const lowerInput = input.toLowerCase();
    
    // Verificar se a entrada corresponde a algum padrão conhecido
    if (lowerInput.includes("produto") || lowerInput.includes("categori") || lowerInput.includes("comprar")) {
      return {
        text: "Temos diversas categorias de produtos disponíveis na loja. Aqui estão alguns links que podem ajudar:",
        isUser: false,
        links: [
          { text: "Ver todas as categorias", url: "/categorias" },
          { text: "Produtos emagrecedores", url: "/categoria/emagrecedores" },
          { text: "Medicamentos de farmácia", url: "/categoria/medicamentos" }
        ]
      };
    } else if (lowerInput.includes("preço") || lowerInput.includes("valor") || lowerInput.includes("custo")) {
      return {
        text: "Os preços variam conforme o produto. Você pode verificar o valor nos detalhes de cada item ou entrar em contato com nossa equipe para informações mais específicas.",
        isUser: false
      };
    } else if (lowerInput.includes("entrega") || lowerInput.includes("frete") || lowerInput.includes("envio")) {
      return {
        text: "Realizamos entregas para todo o Brasil. O prazo e valor do frete são calculados no checkout, com base no seu CEP e nos produtos selecionados.",
        isUser: false,
        links: [
          { text: "Política de entrega", url: "/fretes" }
        ]
      };
    } else if (lowerInput.includes("contato") || lowerInput.includes("telefone") || lowerInput.includes("email")) {
      return {
        text: "Você pode entrar em contato conosco pelos seguintes canais:",
        isUser: false,
        links: [
          { text: "Página de contato", url: "/contato" },
          { text: "WhatsApp", url: "https://wa.me/5511999999999" }
        ]
      };
    } else if (lowerInput.includes("localizacao") || lowerInput.includes("endereco") || lowerInput.includes("loja")) {
      return {
        text: "Nossa loja física está localizada na Av. Paulista, 1000 - São Paulo, SP. Funcionamos de segunda a sábado, das 9h às 20h.",
        isUser: false,
        links: [
          { text: "Ver no mapa", url: "https://maps.google.com" }
        ]
      };
    } else {
      return {
        text: "Desculpe, não entendi completamente sua pergunta. Posso ajudar com informações sobre nossos produtos, entregas, contato ou localização da loja. Poderia reformular sua pergunta?",
        isUser: false,
        links: [
          { text: "Falar com atendente", url: "https://wa.me/5511999999999" }
        ]
      };
    }
  };

  // Rola automaticamente para a mensagem mais recente
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 rounded-full p-3.5 shadow-lg ${
          isOpen ? 'bg-red-500 text-white' : 'bg-imperio-navy text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Fechar assistente virtual" : "Abrir assistente virtual"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
      
      {/* Janela de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          >
            {/* Cabeçalho */}
            <div className="bg-imperio-navy text-white p-4 flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Assistente Virtual</h3>
                <p className="text-xs text-white/80">Imperio Pharma</p>
              </div>
            </div>
            
            {/* Corpo de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg py-2 px-3 max-w-[80%] ${
                      message.isUser
                        ? 'bg-imperio-navy text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                    
                    {/* Links de resposta rápida */}
                    {!message.isUser && message.links && (
                      <div className="mt-2 space-y-1.5">
                        {message.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.url}
                            className="flex items-center text-sm text-imperio-navy bg-blue-50 hover:bg-blue-100 rounded px-2 py-1 w-full transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <ChevronRight size={16} className="mr-1 flex-shrink-0" />
                            <span>{link.text}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            
            {/* Links rápidos */}
            <div className="p-2 bg-gray-100 border-t border-gray-200 grid grid-cols-3 gap-1 text-xs">
              <button 
                onClick={() => {
                  setMessages([...messages, {
                    text: "Como posso ver os produtos?",
                    isUser: true
                  }]);
                  
                  setTimeout(() => {
                    setMessages(prev => [...prev, processUserInput("produtos")]);
                  }, 600);
                }}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors text-imperio-navy"
              >
                <ShoppingCart size={16} className="mb-1" />
                <span>Produtos</span>
              </button>
              
              <button 
                onClick={() => {
                  setMessages([...messages, {
                    text: "Como é feita a entrega?",
                    isUser: true
                  }]);
                  
                  setTimeout(() => {
                    setMessages(prev => [...prev, processUserInput("entrega")]);
                  }, 600);
                }}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors text-imperio-navy"
              >
                <MapPin size={16} className="mb-1" />
                <span>Entregas</span>
              </button>
              
              <button 
                onClick={() => {
                  setMessages([...messages, {
                    text: "Como posso entrar em contato?",
                    isUser: true
                  }]);
                  
                  setTimeout(() => {
                    setMessages(prev => [...prev, processUserInput("contato")]);
                  }, 600);
                }}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors text-imperio-navy"
              >
                <Phone size={16} className="mb-1" />
                <span>Contato</span>
              </button>
            </div>
            
            {/* Formulário de mensagem */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex items-center">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-imperio-navy focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-imperio-navy text-white rounded-r-lg py-2 px-3 text-sm hover:bg-imperio-light-navy transition-colors"
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
