import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface LayerCardProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  color: string;
  delay?: number;
  onClick?: () => void;
}

export function LayerCard({ title, icon: Icon, description, color, delay = 0, onClick }: LayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={onClick}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${color} bg-white/80 backdrop-blur-sm hover:shadow-xl`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color.includes('blue') ? 'bg-blue-100' : color.includes('purple') ? 'bg-purple-100' : color.includes('orange') ? 'bg-orange-100' : 'bg-green-100'}`}>
          <Icon className="size-6" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-600 ml-11">{description}</p>
      )}
    </motion.div>
  );
}
