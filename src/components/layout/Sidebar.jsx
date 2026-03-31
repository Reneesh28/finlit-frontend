import { NavLink } from "react-router-dom";
import { Home, BookOpen, ReceiptText, MessageSquare, PieChart, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Learn", path: "/learn" },
  { icon: ReceiptText, label: "Transactions", path: "/transactions" },
  { icon: MessageSquare, label: "AI Coach", path: "/chat" },
  { icon: PieChart, label: "Insights", path: "/insights" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-dark-card border-r-2 border-slate-100 dark:border-dark-border h-screen fixed left-0 top-0 z-40 transition-colors duration-300">
      <div className="p-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          FinLit <span className="text-primary italic text-xl">Coach</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200",
                isActive
                  ? "bg-primary text-white border-b-4 border-primary-dark shadow-lg shadow-primary/20"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-secondary hover:text-slate-700 dark:hover:text-slate-200"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-slate-50 dark:border-dark-divider space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200",
              isActive
                ? "bg-primary text-white border-b-4 border-primary-dark shadow-lg shadow-primary/20"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-secondary hover:text-slate-700 dark:hover:text-slate-200"
            )
          }
        >
          {({ isActive }) => (
            <>
              <SettingsIcon size={20} strokeWidth={isActive ? 3 : 2.5} />
              Settings
            </>
          )}
        </NavLink>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-bold text-warning hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <LogOut size={20} strokeWidth={2.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
