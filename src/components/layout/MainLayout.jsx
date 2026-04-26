import { Outlet, useLocation } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-screen bg-bg-soft dark:bg-dark-primary flex overflow-hidden transition-colors duration-500">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:pl-72 flex flex-col h-full overflow-hidden transition-all duration-500">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <div className="max-w-7xl mx-auto p-4 md:p-10 pb-32">
            <div className="fixed top-4 right-4 md:top-8 md:right-10 z-50">
              <ThemeToggle />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>


      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
};
