import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SystemNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  specs?: string[];
  delay?: number;
  color?: string;
  glowColor?: string;
}

export function SystemNode({ 
  x, 
  y, 
  width, 
  height, 
  title, 
  subtitle, 
  icon: Icon,
  specs = [],
  delay = 0,
  color = "#ffffff",
  glowColor
}: SystemNodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      {/* Glow effect for important nodes */}
      {glowColor && (
        <rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx="8"
          fill={glowColor}
          opacity="0.2"
          filter="url(#glow)"
        />
      )}
      
      {/* Main node */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="6"
        fill={color}
        stroke="#d1d5db"
        strokeWidth="1.5"
      />
      
      {/* Content */}
      <foreignObject x={x} y={y} width={width} height={height}>
        <div className="p-3 h-full flex flex-col">
          <div className="flex items-start gap-2 mb-1">
            {Icon && (
              <div className="mt-0.5 flex-shrink-0">
                <Icon className="size-4 text-gray-700" strokeWidth={1.5} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-900 leading-tight">{title}</div>
              {subtitle && (
                <div className="text-[9px] text-gray-500 font-mono mt-0.5">{subtitle}</div>
              )}
            </div>
          </div>
          {specs.length > 0 && (
            <div className="mt-auto space-y-0.5">
              {specs.map((spec, idx) => (
                <div key={idx} className="text-[9px] text-gray-600 font-mono leading-tight">
                  • {spec}
                </div>
              ))}
            </div>
          )}
        </div>
      </foreignObject>
    </motion.g>
  );
}
