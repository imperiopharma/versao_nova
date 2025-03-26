import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, MessageCircle, Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatbotService } from '@/hooks/useChatbotService';
import { Avatar } from './Avatar';
import { QuickReplies } from './QuickReplies';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export const VirtualAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    getResponse,
    getQuickReplies,
    checkAndUpdateInputState,
    speechSynthesis,
    stopSpeech,
    startListening,
    stopListening,
    transcript,
    isListeningToSpeech,
    isInputDisabled,
    enableInput
  } = useChatbotService();
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: 'Olá! Sou o assistente virtual da Farmácia Futura. Como posso ajudar você hoje?',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      if (!isMuted) {
        speechSynthesis(welcomeMessage.text);
      }
      
      checkAndUpdateInputState(welcomeMessage.text);
    }
  }, [isOpen, messages.length, isMuted, speechSynthesis, checkAndUpdateInputState]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);
  
  useEffect(() => {
    setIsListening(isListeningToSpeech);
  }, [isListeningToSpeech]);
  
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'bot' && !lastMessage.isTyping) {
      checkAndUpdateInputState(lastMessage.text);
    }
  }, [messages, checkAndUpdateInputState]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    const typingIndicator: Message = {
      id: `typing-${Date.now()}`,
      text: '...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingIndicator]);
    
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const botResponse = getResponse(input);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      checkAndUpdateInputState(botResponse);
      
      if (!isMuted) {
        speechSynthesis(botResponse);
      }
    }, 800);
  };
  
  const handleQuickReplyClick = (text: string) => {
    setInput(text);
    handleSendMessage();
  };
  
  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    }
    
    setIsMuted(!isMuted);
  };
  
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
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
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-4 z-50 w-[calc(100%-2rem)] max-w-md sm:bottom-20 sm:right-6"
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[450px] max-h-[80vh] overflow-hidden">
              <div className="p-3 border-b flex items-center justify-between bg-imperio-navy text-white rounded-t-lg">
                <div className="flex items-center">
                  <Bot size={20} className="mr-2" />
                  <h3 className="font-medium">Vendedor Virtual</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleSpeech}
                    className="text-white hover:text-gray-200 p-1"
                    aria-label={isMuted ? "Ativar voz" : "Desativar voz"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 p-1"
                    aria-label="Fechar chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-3 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}
                  >
                    {message.sender === 'bot' && !message.isTyping && (
                      <div className="flex items-start mb-1">
                        <Avatar className="w-8 h-8 mr-2" />
                        <div></div>
                      </div>
                    )}
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-imperio-navy text-white ml-auto' 
                          : message.isTyping 
                            ? 'bg-gray-200 border border-gray-300 inline-block'
                            : 'bg-white border border-gray-200 shadow-sm'
                      }`}
                    >
                      {message.isTyping ? (
                        <span className="flex space-x-1">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </span>
                      ) : (
                        message.text
                      )}
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                ))}
                
                {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && !messages[messages.length - 1].isTyping && (
                  <QuickReplies 
                    suggestions={getQuickReplies(messages[messages.length - 1].text)} 
                    onSelect={handleQuickReplyClick}
                    enableInput={enableInput}
                  />
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
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
                    placeholder={isInputDisabled ? "Selecione uma opção acima..." : "Digite sua mensagem..."}
                    className={`flex-grow resize-none ${isInputDisabled ? 'bg-gray-100 text-gray-500' : ''}`}
                    rows={2}
                    disabled={isInputDisabled}
                  />
                  <div className="flex flex-col ml-2 gap-2">
                    <Button 
                      onClick={handleVoiceInput}
                      className={`h-10 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                      aria-label={isListening ? "Parar gravação" : "Gravar mensagem"}
                      disabled={isInputDisabled}
                    >
                      <Mic size={20} />
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      className="h-10"
                      disabled={isInputDisabled || input.trim() === ''}
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
