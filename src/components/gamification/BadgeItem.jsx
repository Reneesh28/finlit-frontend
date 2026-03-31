import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const BadgeItem = ({ 
  label, 
  icon: Icon, 
  description, 
  locked = false, 
  date,
  className 
}) => {
  return (
    <motion.div
      whileHover={locked ? {} : { scale: 1.05, y: -5 }}
      whileTap={locked ? {} : { scale: 0.95 }}
      className={cn(
        "relative flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all duration-300 group cursor-pointer",
        locked 
          ? "bg-slate-50 dark:bg-dark-secondary border-slate-100 dark:border-dark-divider grayscale" 
          : "bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border hover:border-primary/30 shadow-md hover:shadow-xl",
        className
      )}
    >
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10 transition-transform duration-300 group-hover:rotate-12",
        locked ? "bg-slate-200 dark:bg-dark-divider text-slate-400" : "bg-primary/10 dark:bg-primary/20 text-primary"
      )}>
        <Icon size={40} strokeWidth={2.5} />
        {!locked && (
          <div className="absolute inset-x-0 inset-y-0 bg-primary/20 rounded-full blur-xl animate-pulse -z-10" />
        )}
      </div>

      <div className="space-y-1">
        <h4 className={cn(
          "text-sm font-black uppercase tracking-widest leading-none",
          locked ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
        )}>
          {label}
        </h4>
        <p className={cn(
          "text-[10px] font-bold leading-tight line-clamp-2",
          locked ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-400"
        )}>
          {description}
        </p>
      </div>

      {locked ? (
        <div className="mt-4 px-3 py-1 bg-slate-200 dark:bg-dark-divider rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">
          Locked
        </div>
      ) : (
        <div className="mt-4 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary">
          Unlocked {date}
        </div>
      )}
    </motion.div>
  );
};
