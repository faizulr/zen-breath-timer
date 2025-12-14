import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useBreathingEngine } from "@/hooks/useBreathingEngine";
import { useZenAudio } from "@/hooks/useZenAudio";
import { BreathingCircle } from "./BreathingCircle";
import { PhaseDisplay } from "./PhaseDisplay";
import { ControlButton } from "./ControlButton";
import { CycleCounter } from "./CycleCounter";
import { MuteButton } from "./MuteButton";

export function ZenBreath() {
  const { phase, countdown, isActive, cycleCount, phaseDuration, toggle } = useBreathingEngine();
  const { initAudio, playPhaseChime, startAmbient, stopAmbient, toggleMute, isMuted } = useZenAudio();
  
  const prevPhaseRef = useRef(phase);

  // Initialize audio on first interaction
  const handleToggle = () => {
    initAudio();
    toggle();
  };

  // Play chime on phase change
  useEffect(() => {
    if (phase !== prevPhaseRef.current && isActive) {
      playPhaseChime(phase);
    }
    prevPhaseRef.current = phase;
  }, [phase, isActive, playPhaseChime]);

  // Start/stop ambient sound
  useEffect(() => {
    if (isActive && !isMuted) {
      startAmbient();
    } else {
      stopAmbient();
    }
  }, [isActive, isMuted, startAmbient, stopAmbient]);

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen py-12 px-6 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-secondary/20 pointer-events-none" />

      {/* Header with mute button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex items-center justify-between w-full max-w-md"
      >
        <h2 className="text-lg font-medium text-foreground/80">Zen Breath</h2>
        <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-md space-y-16">
        {/* Phase display */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-20"
        >
          <PhaseDisplay phase={phase} countdown={countdown} />
        </motion.div>

        {/* Breathing circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-0"
        >
          <BreathingCircle phase={phase} phaseDuration={phaseDuration} />
        </motion.div>

        {/* Cycle counter */}
        <div className="relative z-20">
          <CycleCounter count={cycleCount} />
        </div>
      </main>

      {/* Footer with controls and instruction */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md"
      >
        {/* Instructional text */}
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Breathe in through nose, hold, out through mouth
        </p>

        {/* Control button */}
        <ControlButton isActive={isActive} onToggle={handleToggle} />
      </motion.footer>
    </div>
  );
}
