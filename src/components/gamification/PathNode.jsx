import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { cn } from "../../utils/cn";

export const PathNode = ({
  icon: Icon,
  status = "locked",
  onClick,
  index,
  label
}) => {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  const variants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, y: -4 },
    tap: { scale: 0.95, y: 0 }
  };

  const getBgColor = () => {
    if (isCompleted) return "bg-primary border-primary-dark shadow-primary-dark/20";
    if (isCurrent) return "bg-secondary border-secondary-dark shadow-secondary-dark/20 animate-pulse";
    return "bg-slate-200 dark:bg-dark-secondary border-slate-300 dark:border-dark-divider shadow-slate-100 dark:shadow-none grayscale";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        variants={variants}
        initial="initial"
        animate="animate"
        whileHover={!isLocked ? "hover" : {}}
        whileTap={!isLocked ? "tap" : {}}
        onClick={!isLocked ? onClick : undefined}
        disabled={isLocked}
        className={cn(
          "relative w-20 h-20 md:w-24 md:h-24 rounded-full border-b-8 flex items-center justify-center transition-all duration-300 shadow-xl",
          getBgColor()
        )}
      >
        {isLocked ? (
          <Lock className="text-slate-400 dark:text-slate-600" size={32} strokeWidth={3} />
        ) : isCompleted ? (
          <Check className="text-white" size={40} strokeWidth={4} />
        ) : (
          <div className="text-white flex flex-col items-center">
            {Icon && <Icon size={32} strokeWidth={3} />}
            {!Icon && <span className="text-2xl font-black">{index}</span>}
          </div>
        )}

        {/* Glow effect for current */}
        {isCurrent && (
          <div className="absolute inset-0 bg-secondary/30 dark:bg-secondary/40 rounded-full blur-2xl -z-10 animate-ping" />
        )}
      </motion.button>

      {label && (
        <span className={cn(
          "text-xs md:text-sm font-black uppercase tracking-widest text-center",
          isLocked ? "text-slate-300 dark:text-slate-700" : "text-slate-800 dark:text-slate-200"
        )}>
          {label}
        </span>
      )}
    </div>
  );
};
