import { motion } from "motion/react";

export function Legend() {
  const items = [
    { label: "Data Flow", color: "#6B7280", dashed: false },
    { label: "Gradient Flow", color: "#3B82F6", dashed: false },
    { label: "Feedback Loop", color: "#DC2626", dashed: false },
    { label: "Control Signal", color: "#8B5CF6", dashed: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">
        Legend
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <svg width="24" height="2">
              <line
                x1="0"
                y1="1"
                x2="24"
                y2="1"
                stroke={item.color}
                strokeWidth="1.5"
                strokeDasharray={item.dashed ? "3 3" : "0"}
              />
            </svg>
            <span className="text-xs text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
