import { motion } from "motion/react";
import { ReactNode } from "react";

interface LayerSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  delay?: number;
  color?: string;
}

export function LayerSection({ title, description, children, delay = 0, color = "gray" }: LayerSectionProps) {
  const borderColors = {
    gray: "border-l-gray-400",
    blue: "border-l-blue-500",
    purple: "border-l-purple-500",
    orange: "border-l-orange-500",
    green: "border-l-green-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`border-l-4 ${borderColors[color as keyof typeof borderColors] || borderColors.gray} pl-6 py-4`}
    >
      <div className="mb-4">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-medium">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </motion.div>
  );
}
