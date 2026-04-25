import { motion } from "framer-motion";

export const Skeleton = ({ className, variant = "rect" }) => {
  const variants = {
    rect: "rounded-2xl",
    circle: "rounded-full",
    text: "rounded-lg h-4 w-full",
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-dark-divider ${variants[variant]} ${className}`}>
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
      />
    </div>
  );
};

export const LoadingSpinner = ({ size = "md", color = "primary" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colors = {
    primary: "border-primary/20 border-t-primary",
    white: "border-white/20 border-t-white",
    accent: "border-accent/20 border-t-accent",
  };

  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`} />
  );
};
