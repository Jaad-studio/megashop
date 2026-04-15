import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ToastNotification from './components/ToastNotification';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    exit={{ opacity: 0, filter: 'blur(8px)', y: -15 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      <CustomCursor />
      <AnimatePresence>
        {loading && <SplashScreen key="splash" onFinish={() => setLoading(false)} />}
      </AnimatePresence>
      <ToastNotification />
      <Cart />
      <FloatingWhatsApp />
      
      {!loading && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/category/:type" element={<PageTransition><Category /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      )}
    </CartProvider>
  );
}

export default App;
