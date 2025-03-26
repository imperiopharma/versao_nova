
import { useState, useCallback, useEffect } from 'react';
import { getResponseForPattern, getQuickRepliesForResponse } from '@/services/chatbotService';

// Definindo as interfaces de tipagem para a Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
  item(index: number): SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
  prototype: SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;
  grammars: any;
  
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  
  start(): void;
  stop(): void;
  abort(): void;
}

export const useChatbotService = () => {
  const [transcript, setTranscript] = useState('');
  const [isListeningToSpeech, setIsListeningToSpeech] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  
  // Inicializar o sintetizador de voz e reconhecimento
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Inicializar sintetizador
      setSynth(window.speechSynthesis);
      
      // Inicializar reconhecimento de voz se disponível no navegador
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognitionAPI();
        
        recognitionInstance.lang = 'pt-BR';
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
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
    const replies = getQuickRepliesForResponse(botResponse);
    
    // Desabilitar input se houver respostas rápidas
    setIsInputDisabled(replies.length > 0);
    
    return replies;
  }, []);
  
  // Função para habilitar o campo de entrada manualmente
  const enableInput = useCallback(() => {
    setIsInputDisabled(false);
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
    isListeningToSpeech,
    isInputDisabled,
    enableInput
  };
};

// Adicionar tipos para o navegador
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionStatic;
    webkitSpeechRecognition?: SpeechRecognitionStatic;
  }
}
