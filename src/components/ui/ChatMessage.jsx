import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { cn } from "../../utils/cn";

export const ChatMessage = ({ message, isAi, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full gap-4 mb-6",
        isAi ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
        isAi ? "bg-accent text-white" : "bg-primary text-white"
      )}>
        {isAi ? <Sparkles size={20} strokeWidth={2.5} /> : <User size={20} strokeWidth={2.5} />}
      </div>

      {/* Bubble Container */}
      <div className={cn(
        "flex flex-col gap-1 max-w-[80%]",
        isAi ? "items-start" : "items-end"
      )}>
        {/* Info Label */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {isAi ? "AI Coach" : "You"}
          </span>
          <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 tracking-tight">
            {timestamp}
          </span>
        </div>

        {/* Message Bubble */}
        <div className={cn(
          "p-4 rounded-3xl font-bold text-sm leading-relaxed border-b-4 transition-all duration-300",
          isAi
            ? "bg-white dark:bg-dark-secondary text-slate-700 dark:text-slate-200 border-slate-100 dark:border-dark-border rounded-tl-none shadow-sm hover:border-accent/20"
            : "bg-primary text-white border-primary-dark rounded-tr-none shadow-md"
        )}>
          {message}
        </div>
      </div>
    </motion.div>
  );
};
