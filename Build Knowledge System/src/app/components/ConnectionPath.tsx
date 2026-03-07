import { motion } from "motion/react";

interface ConnectionPathProps {
  d: string;
  delay?: number;
  type?: "data" | "feedback" | "control" | "gradient";
  label?: string;
  animate?: boolean;
}

export function ConnectionPath({ 
  d, 
  delay = 0, 
  type = "data", 
  label,
  animate = true 
}: ConnectionPathProps) {
  const styles = {
    data: { stroke: "#6B7280", strokeWidth: 2, dashArray: "0" },
    feedback: { stroke: "#DC2626", strokeWidth: 2.5, dashArray: "0" },
    control: { stroke: "#8B5CF6", strokeWidth: 2, dashArray: "5,5" },
    gradient: { stroke: "#3B82F6", strokeWidth: 2, dashArray: "0" }
  };

  const style = styles[type];

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        strokeDasharray={style.dashArray}
        initial={animate ? { pathLength: 0, opacity: 0 } : {}}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay, duration: 0.8, ease: "easeInOut" }}
        markerEnd={`url(#arrowhead-${type})`}
      />
      {label && (
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
          className="text-[10px] fill-gray-600 font-mono"
          style={{ userSelect: 'none' }}
        >
          <textPath href={`#path-${label.replace(/\s/g, '')}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </motion.text>
      )}
    </g>
  );
}
