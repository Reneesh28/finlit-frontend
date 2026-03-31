import { cn } from "../../utils/cn";

export const PathConnector = ({ status = "locked", offset = 0 }) => {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";

  return (
    <div
      className={cn(
        "w-6 h-12 md:h-16 relative -z-10 transition-all duration-500",
        isCompleted || isCurrent ? "bg-primary shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-dark-divider"
      )}
      style={{
        transform: `translateX(${offset}px) scaleX(1.5) rotate(${offset > 0 ? -15 : offset < 0 ? 15 : 0}deg)`,
        borderRadius: "12px",
        margin: "-12px auto -12px auto"
      }}
    />
  );
};
