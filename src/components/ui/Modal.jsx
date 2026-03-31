import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useEffect } from "react";

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className, 
  footer 
}) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className={cn(
              "relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border-2 border-slate-100",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-2">
              <h3 className="text-xl font-black text-slate-800">{title}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-2">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-6 pt-0 flex gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
