import { useRef, useCallback, useEffect, useState } from "react";
import { BreathingPhase } from "./useBreathingEngine";

// Web Audio API for generating ambient tones and chimes
export function useZenAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // Initialize audio context on first user interaction
  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;
    
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      setIsAudioInitialized(true);
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }, []);

  // Play a soft chime for phase transitions
  const playChime = useCallback((frequency: number = 440, duration: number = 0.5) => {
    if (!audioContextRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    // Soft attack and decay envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [isMuted]);

  // Play phase-specific chimes
  const playPhaseChime = useCallback((phase: BreathingPhase) => {
    if (phase === "ready") return;
    
    // Different frequencies for different phases
    const frequencies: Record<Exclude<BreathingPhase, "ready">, number> = {
      inhale: 528,  // C5 - "Miracle tone"
      hold: 639,    // Higher, sustained feel
      exhale: 396,  // Lower, releasing
    };

    playChime(frequencies[phase], phase === "hold" ? 0.8 : 0.5);
  }, [playChime]);

  // Start ambient drone (very subtle background)
  const startAmbient = useCallback(() => {
    if (!audioContextRef.current || ambientOscillatorRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Very low, subtle drone
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(55, ctx.currentTime); // Low A

    // Lowpass filter for smoothness
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);

    // Very quiet
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);

    oscillator.start();
    
    ambientOscillatorRef.current = oscillator;
    ambientGainRef.current = gainNode;
  }, [isMuted]);

  // Stop ambient sound
  const stopAmbient = useCallback(() => {
    if (ambientOscillatorRef.current && ambientGainRef.current) {
      const ctx = audioContextRef.current;
      if (ctx) {
        ambientGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        setTimeout(() => {
          ambientOscillatorRef.current?.stop();
          ambientOscillatorRef.current = null;
          ambientGainRef.current = null;
        }, 1000);
      }
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) {
        stopAmbient();
      }
      return !prev;
    });
  }, [stopAmbient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAmbient]);

  return {
    initAudio,
    playPhaseChime,
    startAmbient,
    stopAmbient,
    toggleMute,
    isMuted,
    isAudioInitialized,
  };
}
