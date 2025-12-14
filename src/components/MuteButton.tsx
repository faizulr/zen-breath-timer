import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export function MuteButton({ isMuted, onToggle }: MuteButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </motion.button>
  );
}
