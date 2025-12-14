import { motion, type Transition } from "framer-motion";
import { BreathingPhase } from "@/hooks/useBreathingEngine";

interface BreathingCircleProps {
  phase: BreathingPhase;
  phaseDuration: number;
}

const PHASE_SCALES: Record<BreathingPhase, number> = {
  ready: 1,
  inhale: 1.5,
  hold: 1.5,
  exhale: 1,
};

const PHASE_DURATIONS: Record<BreathingPhase, number> = {
  ready: 0.3,
  inhale: 4,
  hold: 7,
  exhale: 8,
};

export function BreathingCircle({ phase }: BreathingCircleProps) {
  const targetScale = PHASE_SCALES[phase];
  const duration = PHASE_DURATIONS[phase];
  
  // Get transition config for each phase
  const getTransition = (): Transition => {
    if (phase === "inhale") {
      return { duration, ease: "easeInOut" };
    } else if (phase === "exhale") {
      return { duration, ease: "easeOut" };
    }
    return { duration, ease: "easeInOut" };
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow layer */}
      <motion.div
        className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: targetScale * 1.2,
          opacity: phase === "hold" ? [0.3, 0.5, 0.3] : 0.3,
        }}
        transition={{
          scale: getTransition(),
          opacity: phase === "hold" 
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 },
        }}
      />

      {/* Main breathing circle */}
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-full zen-gradient zen-glow"
        animate={{
          scale: targetScale,
        }}
        transition={getTransition()}
      >
        {/* Inner subtle pulse during hold */}
        {phase === "hold" && (
          <motion.div
            className="absolute inset-2 rounded-full bg-primary-foreground/5"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
