import { motion, AnimatePresence } from "framer-motion";
import { BreathingPhase } from "@/hooks/useBreathingEngine";

interface PhaseDisplayProps {
  phase: BreathingPhase;
  countdown: number;
}

const PHASE_LABELS: Record<BreathingPhase, string> = {
  ready: "Ready",
  inhale: "Inhale",
  hold: "Hold",
  exhale: "Exhale",
};

export function PhaseDisplay({ phase, countdown }: PhaseDisplayProps) {
  return (
    <div className="text-center space-y-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={phase}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-5xl font-light tracking-wide text-foreground"
        >
          {PHASE_LABELS[phase]}
        </motion.h1>
      </AnimatePresence>

      <motion.div
        className="text-6xl md:text-7xl font-extralight text-primary tabular-nums"
        key={countdown}
        initial={{ scale: 1.1, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {phase === "ready" ? "—" : countdown}
      </motion.div>
    </div>
  );
}
