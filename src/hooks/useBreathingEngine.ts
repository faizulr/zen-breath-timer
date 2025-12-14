import { useState, useEffect, useCallback, useRef } from "react";

export type BreathingPhase = "ready" | "inhale" | "hold" | "exhale";

interface BreathingState {
  phase: BreathingPhase;
  countdown: number;
  isActive: boolean;
  cycleCount: number;
}

// 4-7-8 breathing pattern durations in seconds
const PHASE_DURATIONS: Record<Exclude<BreathingPhase, "ready">, number> = {
  inhale: 4,
  hold: 7,
  exhale: 8,
};

const PHASE_ORDER: Exclude<BreathingPhase, "ready">[] = ["inhale", "hold", "exhale"];

export function useBreathingEngine() {
  const [state, setState] = useState<BreathingState>({
    phase: "ready",
    countdown: 0,
    isActive: false,
    cycleCount: 0,
  });

  const intervalRef = useRef<number | null>(null);
  const phaseStartTimeRef = useRef<number>(0);
  const currentPhaseIndexRef = useRef<number>(0);

  // Haptic feedback helper
  const triggerHaptic = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  // Get the next phase in the cycle
  const getNextPhase = useCallback((currentPhase: BreathingPhase): Exclude<BreathingPhase, "ready"> => {
    if (currentPhase === "ready" || currentPhase === "exhale") {
      return "inhale";
    }
    const currentIndex = PHASE_ORDER.indexOf(currentPhase as Exclude<BreathingPhase, "ready">);
    return PHASE_ORDER[(currentIndex + 1) % PHASE_ORDER.length];
  }, []);

  // Start the breathing exercise
  const start = useCallback(() => {
    const initialPhase: Exclude<BreathingPhase, "ready"> = "inhale";
    phaseStartTimeRef.current = Date.now();
    currentPhaseIndexRef.current = 0;
    
    triggerHaptic();
    
    setState({
      phase: initialPhase,
      countdown: PHASE_DURATIONS[initialPhase],
      isActive: true,
      cycleCount: 0,
    });
  }, [triggerHaptic]);

  // Stop and reset (preserve cycle count)
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setState(prev => ({
      phase: "ready",
      countdown: 0,
      isActive: false,
      cycleCount: prev.cycleCount,
    }));
  }, []);

  // Toggle between start and stop
  const toggle = useCallback(() => {
    if (state.isActive) {
      stop();
    } else {
      start();
    }
  }, [state.isActive, start, stop]);

  // Main timer effect
  useEffect(() => {
    if (!state.isActive) return;

    intervalRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - phaseStartTimeRef.current) / 1000;
      const currentPhase = state.phase as Exclude<BreathingPhase, "ready">;
      const phaseDuration = PHASE_DURATIONS[currentPhase];
      const remaining = Math.max(0, Math.ceil(phaseDuration - elapsed));

      if (elapsed >= phaseDuration) {
        // Phase complete, move to next
        const nextPhase = getNextPhase(state.phase);
        phaseStartTimeRef.current = Date.now();
        
        triggerHaptic();
        
        setState(prev => ({
          ...prev,
          phase: nextPhase,
          countdown: PHASE_DURATIONS[nextPhase],
          // Increment cycle count when we complete an exhale (full cycle)
          cycleCount: prev.phase === "exhale" ? prev.cycleCount + 1 : prev.cycleCount,
        }));
      } else {
        setState(prev => ({
          ...prev,
          countdown: remaining,
        }));
      }
    }, 100); // Update frequently for smooth countdown

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isActive, state.phase, getNextPhase, triggerHaptic]);

  return {
    phase: state.phase,
    countdown: state.countdown,
    isActive: state.isActive,
    cycleCount: state.cycleCount,
    phaseDuration: state.phase !== "ready" ? PHASE_DURATIONS[state.phase] : 0,
    start,
    stop,
    toggle,
  };
}
