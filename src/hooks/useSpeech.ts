import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechReturn {
  isListening: boolean;
  startListening: (langCode: 'en-IN' | 'kn-IN') => void;
  stopListening: () => void;
  speak: (text: string, langCode: 'en-IN' | 'kn-IN') => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  supported: boolean;
}

export function useSpeech(onResult: (text: string) => void): UseSpeechReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };

      rec.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        if (resultText && onResult) {
          onResult(resultText);
        }
      };

      recognitionRef.current = rec;
    }
  }, [onResult]);

  const startListening = useCallback((langCode: 'en-IN' | 'kn-IN') => {
    if (!recognitionRef.current) return;
    
    // Stop speaking if speaking
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    try {
      recognitionRef.current.lang = langCode;
      recognitionRef.current.start();
    } catch (err) {
      console.warn("Already listening or error:", err);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const speak = useCallback((text: string, langCode: 'en-IN' | 'kn-IN') => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // cancel current speech
    
    // Clean text: remove markdown links/bold/bullets for speech synthesis
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove markdown links, keeping text
      .replace(/[*#_`]/g, '') // remove markdown symbols
      .substring(0, 300); // limit speech output length for clean UX

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;

    // Try to find matching voice
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang === langCode || v.lang.startsWith(langCode.substring(0, 2)));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSpeaking,
    supported
  };
}
