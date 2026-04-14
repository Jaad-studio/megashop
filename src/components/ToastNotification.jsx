import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ToastNotification = () => {
  const { toastMessage, setToastMessage } = useCart();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-4 py-3 rounded-2xl glass-card flex items-center gap-3 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-w-[90vw] md:max-w-md w-full mx-auto"
        >
          <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} className="text-[#00f0ff]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">Ajouté au panier</h4>
            <p className="text-xs font-medium text-white/50 truncate">
              {toastMessage.product}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
