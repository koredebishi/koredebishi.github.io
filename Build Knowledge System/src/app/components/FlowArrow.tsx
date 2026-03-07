import { motion } from "motion/react";

interface FlowArrowProps {
  delay?: number;
  variant?: "down" | "loop";
}

export function FlowArrow({ delay = 0, variant = "down" }: FlowArrowProps) {
  if (variant === "loop") {
    return (
      <div className="relative flex justify-center my-4">
        <motion.div
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ delay, duration: 1.5, ease: "easeInOut" }}
          className="absolute right-0 top-0"
        >
          <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M 30 0 L 30 30 Q 30 40 40 40 L 50 40 L 50 80 Q 50 90 40 90 L 30 90"
              stroke="#D81B60"
              strokeWidth="3"
              fill="none"
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay, duration: 1.5, ease: "easeInOut" }}
            />
            <motion.polygon
              points="30,95 25,85 35,85"
              fill="#D81B60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 1.5 }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-600"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-600"
        />
      </motion.div>
    </div>
  );
}
