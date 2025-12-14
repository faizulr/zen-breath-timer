import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";

interface ControlButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export function ControlButton({ isActive, onToggle }: ControlButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative flex items-center justify-center w-16 h-16 rounded-full bg-secondary border border-border/50 text-foreground shadow-lg hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isActive ? "Stop breathing exercise" : "Start breathing exercise"}
    >
      <motion.div
        key={isActive ? "stop" : "play"}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {isActive ? (
          <Square className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 fill-current ml-1" />
        )}
      </motion.div>
    </motion.button>
  );
}
