import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 border-b-4",
        theme === "dark"
          ? "bg-dark-secondary border-dark-divider text-highlight shadow-lg shadow-highlight/10"
          : "bg-white border-slate-100 text-slate-400 hover:text-secondary shadow-md",
        className
      )}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? <Sun size={24} strokeWidth={3} /> : <Moon size={24} strokeWidth={3} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
