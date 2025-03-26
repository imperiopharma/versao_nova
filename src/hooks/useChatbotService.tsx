
import { useState, useCallback, useEffect } from 'react';
import { getResponseForPattern, getQuickRepliesForResponse } from '@/services/chatbotService';

export const useChatbotService = () => {
  const [transcript, setTranscript] = useState('');
  const [isListeningToSpeech, setIsListeningToSpeech] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  
  // Inicializar o sintetizador de voz e reconhecimento
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Inicializar sintetizador
      setSynth(window.speechSynthesis);
      
      // Inicializar reconhecimento de voz se disponível no navegador
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.lang = 'pt-BR';
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          setIsListeningToSpeech(false);
        };
        
        recognitionInstance.onend = () => {
          setIsListeningToSpeech(false);
        };
        
        recognitionInstance.onerror = () => {
          setIsListeningToSpeech(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
    
    // Limpar
    return () => {
      if (synth && synth.speaking) {
        synth.cancel();
      }
      
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);
  
  // Função para obter uma resposta baseada no input do usuário
  const getResponse = useCallback((userInput: string) => {
    return getResponseForPattern(userInput);
  }, []);
  
  // Função para obter respostas rápidas sugeridas
  const getQuickReplies = useCallback((botResponse: string) => {
    return getQuickRepliesForResponse(botResponse);
  }, []);
  
  // Função para sintetizar voz
  const speechSynthesis = useCallback((text: string) => {
    if (synth) {
      // Cancelar qualquer fala em andamento
      if (synth.speaking) {
        synth.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      synth.speak(utterance);
      return true;
    }
    return false;
  }, [synth]);
  
  // Função para parar a fala
  const stopSpeech = useCallback(() => {
    if (synth && synth.speaking) {
      synth.cancel();
    }
  }, [synth]);
  
  // Funções para gerenciar o reconhecimento de voz
  const startListening = useCallback(() => {
    if (recognition) {
      try {
        setTranscript('');
        recognition.start();
        setIsListeningToSpeech(true);
      } catch (error) {
        console.error('Erro ao iniciar reconhecimento de voz:', error);
        setIsListeningToSpeech(false);
      }
    } else {
      console.warn('Reconhecimento de voz não suportado');
    }
  }, [recognition]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListeningToSpeech(false);
    }
  }, [recognition]);
  
  return {
    getResponse,
    getQuickReplies,
    speechSynthesis,
    stopSpeech,
    startListening,
    stopListening,
    transcript,
    isListeningToSpeech
  };
};

// Adicionar tipos para o navegador
declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}
