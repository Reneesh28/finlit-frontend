import { motion } from "framer-motion";
import { Sparkles, User, Clock } from "lucide-react";
import { cn } from "../../utils/cn";

export const ChatMessage = ({ message, isAi, timestamp, isTyping }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full gap-3 mb-4 transition-all duration-300",
        isAi ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar with Glow */}
      <div className="relative shrink-0">
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110",
          isAi
            ? "bg-gradient-to-br from-primary to-accent text-white shadow-primary/20"
            : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-dark-elevated dark:to-dark-card text-slate-500 shadow-slate-200/20"
        )}>
          {isAi ? <Sparkles size={18} strokeWidth={3} /> : <User size={18} strokeWidth={3} />}
        </div>
        {isAi && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-primary rounded-full animate-pulse" />
        )}
      </div>

      {/* Bubble Container */}
      <div className={cn(
        "flex flex-col gap-1.5 max-w-[85%]",
        isAi ? "items-start" : "items-end"
      )}>
        {/* Message Bubble */}
        <div className={cn(
          "px-5 py-4 rounded-[1.5rem] text-[15px] font-bold leading-relaxed shadow-sm transition-all duration-300",
          isAi
            ? "bg-white dark:bg-dark-secondary text-slate-700 dark:text-slate-100 border-2 border-slate-50 dark:border-dark-divider rounded-tl-none hover:border-primary/20"
            : "bg-primary text-white border-2 border-primary-dark rounded-tr-none shadow-primary/20"
        )}>
          {isTyping ? (
            <TypingIndicator />
          ) : (
            message
          )}
        </div>

        {/* Info Label / Timestamp */}
        <div className={cn(
          "flex items-center gap-2 px-1 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500",
          isAi ? "flex-row" : "flex-row-reverse"
        )}>
          <span>{isAi ? "Coach" : "You"}</span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1 font-bold">
            <Clock size={10} /> {timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15
        }}
        className="w-1.5 h-1.5 bg-primary/40 rounded-full"
      />
    ))}
  </div>
);
