import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface TechnicalNodeProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  specs?: string[];
  delay?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
}

export function TechnicalNode({ 
  title, 
  subtitle, 
  icon: Icon, 
  specs = [], 
  delay = 0, 
  size = "md",
  variant = "primary" 
}: TechnicalNodeProps) {
  const sizeClasses = {
    sm: "px-4 py-3",
    md: "px-6 py-4",
    lg: "px-8 py-6"
  };

  const variantClasses = {
    primary: "bg-white border-gray-300 shadow-sm",
    secondary: "bg-gray-50 border-gray-200",
    tertiary: "bg-blue-50/30 border-blue-200/50"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      className={`${sizeClasses[size]} ${variantClasses[variant]} border rounded-lg hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5">
            <Icon className="size-5 text-gray-700" strokeWidth={1.5} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 tracking-tight">{title}</div>
          {subtitle && (
            <div className="text-xs text-gray-500 mt-0.5 font-mono">{subtitle}</div>
          )}
          {specs.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {specs.map((spec, idx) => (
                <div key={idx} className="text-xs text-gray-600 font-mono flex items-center gap-1.5">
                  <span className="text-gray-400">•</span>
                  {spec}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
