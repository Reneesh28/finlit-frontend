import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  color = "primary", 
  height = "h-4", 
  className 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    warning: "bg-warning",
    highlight: "bg-highlight",
  };

  return (
    <div className={cn("w-full bg-slate-200 rounded-full overflow-hidden relative", height, className)}>
      {/* Shine effect */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "h-full rounded-full relative transition-all duration-300",
          colors[color]
        )}
      >
        <div className="absolute top-1/2 left-0 w-full h-[30%] -translate-y-1/2 bg-white/20 rounded-full" />
      </motion.div>
    </div>
  );
};
