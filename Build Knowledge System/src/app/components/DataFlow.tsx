import { motion } from "motion/react";

interface DataFlowProps {
  label?: string;
  type?: "data" | "gradient" | "feedback" | "control";
  delay?: number;
  vertical?: boolean;
}

export function DataFlow({ label, type = "data", delay = 0, vertical = true }: DataFlowProps) {
  const colors = {
    data: { stroke: "#6B7280", fill: "#6B7280" },
    gradient: { stroke: "#3B82F6", fill: "#3B82F6" },
    feedback: { stroke: "#DC2626", fill: "#DC2626" },
    control: { stroke: "#8B5CF6", fill: "#8B5CF6" }
  };

  const { stroke, fill } = colors[type];

  if (!vertical) {
    return (
      <div className="flex items-center gap-2 my-2">
        {label && <span className="text-xs text-gray-500 font-mono">{label}</span>}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay, duration: 0.5, ease: "easeOut" }}
          className="flex-1 flex items-center"
        >
          <div className="flex-1 relative">
            <svg className="w-full h-2" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="4"
                x2="100%"
                y2="4"
                stroke={stroke}
                strokeWidth="1.5"
                strokeDasharray={type === "control" ? "4 4" : "0"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay, duration: 0.5 }}
              />
            </svg>
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4 }}
            >
              <svg width="8" height="8">
                <polygon points="0,0 8,4 0,8" fill={fill} />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 my-3">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay, duration: 0.4, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        <svg width="2" height="40" className="overflow-visible">
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="40"
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray={type === "control" ? "4 4" : "0"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay, duration: 0.4 }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          <svg width="8" height="8">
            <polygon points="4,8 0,0 8,0" fill={fill} />
          </svg>
        </motion.div>
      </motion.div>
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-xs text-gray-500 font-mono bg-white px-2 py-0.5 rounded"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
