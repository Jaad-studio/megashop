import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <CartProvider>
      <Cart />
      <FloatingWhatsApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<Category />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
