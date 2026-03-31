import { Outlet } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "../ui/ThemeToggle";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-bg-soft dark:bg-dark-primary flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto p-4 md:p-8 relative">
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
            <ThemeToggle />
          </div>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
};
