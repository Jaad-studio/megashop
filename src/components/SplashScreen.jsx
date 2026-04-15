import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1800); // 1.8s
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center flex-col"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.6 } }}
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00f0ff] drop-shadow-[0_0_30px_rgba(255,0,255,0.5)] z-10 relative"
        >
          Megashop
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-[#ff00ff] to-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.6)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
