import { NavLink } from "react-router-dom";
import { Home, BookOpen, ReceiptText, MessageSquare, PieChart, User } from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Learn", path: "/learn" },
  { icon: ReceiptText, label: "History", path: "/transactions" },
  { icon: MessageSquare, label: "Coach", path: "/chat" },
  { icon: PieChart, label: "Insights", path: "/insights" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-dark-card border-t-2 border-slate-100 dark:border-dark-divider px-4 md:hidden z-40 transition-colors duration-300">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-200",
                isActive ? "text-primary shadow-lg" : "text-slate-400 dark:text-slate-500"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    "p-1.5 rounded-xl transition-all duration-300",
                    isActive && "bg-primary/10 dark:bg-primary/20"
                  )}
                >
                  <item.icon
                    size={24}
                    strokeWidth={isActive ? 3 : 2.5}
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-wider transition-all",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
