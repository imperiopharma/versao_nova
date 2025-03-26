
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const VirtualAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Adicionar mensagem inicial do assistente quando o chat for aberto
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: 'Olá! Sou o assistente virtual da Farmácia Futura. Como posso ajudar você hoje?',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulação de resposta do bot (aqui você pode integrar com uma API de IA futuramente)
    setTimeout(() => {
      let botResponse = '';
      
      // Respostas simples baseadas em palavras-chave
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('medicamento') || lowerInput.includes('remédio')) {
        botResponse = 'Temos uma ampla variedade de medicamentos. Qual você está procurando? Posso verificar disponibilidade e preço para você.';
      } else if (lowerInput.includes('entrega') || lowerInput.includes('frete')) {
        botResponse = 'Oferecemos entrega para toda a cidade! Para compras acima de R$200, o frete é grátis. Normalmente entregamos em até 2 horas após a confirmação do pedido.';
      } else if (lowerInput.includes('horário') || lowerInput.includes('funcionamento')) {
        botResponse = 'Nossa farmácia funciona de segunda a sábado, das 7h às 22h. Aos domingos e feriados, das 8h às 20h.';
      } else if (lowerInput.includes('desconto') || lowerInput.includes('promoção')) {
        botResponse = 'Temos várias promoções ativas! Assinantes do nosso programa VIP têm 10% de desconto em todos os produtos. Além disso, temos ofertas semanais de até 30% em produtos selecionados.';
      } else if (lowerInput.includes('obrigado') || lowerInput.includes('valeu')) {
        botResponse = 'Por nada! Estou sempre à disposição para ajudar. Precisa de mais alguma coisa?';
      } else {
        botResponse = 'Entendi! Posso ajudar com informações sobre medicamentos, entregas, horários de funcionamento e promoções. O que mais você gostaria de saber?';
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Botão flutuante para abrir o chat */}
      <div className="fixed bottom-20 right-4 z-50 sm:bottom-6 sm:right-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-imperio-navy text-white rounded-full p-3 shadow-lg flex items-center justify-center"
          aria-label={isOpen ? "Fechar assistente virtual" : "Abrir assistente virtual"}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </div>
      
      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-4 z-50 w-[calc(100%-2rem)] max-w-md sm:bottom-20 sm:right-6"
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[450px] max-h-[80vh]">
              {/* Cabeçalho do chat */}
              <div className="p-3 border-b flex items-center justify-between bg-imperio-navy text-white rounded-t-lg">
                <div className="flex items-center">
                  <Bot size={20} className="mr-2" />
                  <h3 className="font-medium">Assistente Virtual</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                  aria-label="Fechar chat"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Corpo da conversa */}
              <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-3 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}
                  >
                    <div 
                      className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-imperio-navy text-white ml-auto' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {message.text}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input para enviar mensagem */}
              <div className="p-3 border-t">
                <div className="flex">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="flex-grow resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="ml-2 h-auto"
                    disabled={input.trim() === ''}
                  >
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
