import { motion } from "framer-motion";

interface CycleCounterProps {
  count: number;
}

export function CycleCounter({ count }: CycleCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center"
    >
      <span className="text-sm text-muted-foreground">
        {count === 0 ? (
          "Cycles completed: 0"
        ) : (
          <>
            Cycles completed:{" "}
            <motion.span
              key={count}
              initial={{ scale: 1.3, color: "hsl(var(--primary))" }}
              animate={{ scale: 1, color: "hsl(var(--foreground))" }}
              transition={{ duration: 0.3 }}
              className="font-medium"
            >
              {count}
            </motion.span>
          </>
        )}
      </span>
    </motion.div>
  );
}
