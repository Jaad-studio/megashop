import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const formatWhatsAppMessage = () => {
    let text = "*📦 NOUVELLE COMMANDE MEGASHOP*\n\n";
    cartItems.forEach((item) => {
      text += `• ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    text += `\n*TOTAL : ${cartTotal.toFixed(2)}€*\n\nBonjour, je souhaite valider ma commande.`;
    return encodeURIComponent(text);
  };

  const handleCheckout = () => {
    window.open(`https://wa.me/33744253215?text=${formatWhatsAppMessage()}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0a0a0a]/80 backdrop-blur-2xl border-l border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[210] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff00ff]/10 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-[#ff00ff]" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-white">Mon Panier</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div className="px-5 md:px-6 pt-5 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white/70">
                    {cartTotal >= 50 
                      ? "🎉 Livraison gratuite débloquée !" 
                      : `Plus que ${(50 - cartTotal).toFixed(2)}€ pour la livraison offerte`}
                  </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((cartTotal / 50) * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#ff00ff] to-[#00f0ff] shadow-[0_0_10px_rgba(255,0,255,0.5)]"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium text-center">Votre panier est vide</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors text-sm font-bold tracking-wide uppercase"
                  >
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.name} className="flex gap-4 p-3 rounded-2xl glass-card">
                    {/* Item Image */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#0e0e0e] flex-shrink-0 relative">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-bold text-white/90 leading-tight mb-1">{item.name}</h3>
                        <p className="font-black text-[#00f0ff]">{item.price}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white/[0.06] rounded-lg border border-white/[0.05]">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="p-1.5 text-white/60 hover:text-white hover:bg-white/[0.1] transition-colors rounded-l-lg"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="p-1.5 text-white/60 hover:text-white hover:bg-white/[0.1] transition-colors rounded-r-lg"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="p-2 text-white/40 hover:text-[#ff00ff] hover:bg-[#ff00ff]/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 md:p-6 border-t border-white/[0.08] bg-black/40">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60 font-medium">Total</span>
                  <span className="text-2xl font-black text-gradient-main">{cartTotal.toFixed(2)}€</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-[#25D366] text-white font-black text-base uppercase tracking-wide hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle size={20} className="filter drop-shadow-md" />
                  Commander via WhatsApp
                </button>

                {/* Trust Badges */}
                <div className="mt-5 flex flex-col items-center justify-center space-y-3 opacity-80">
                   <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-white/90 uppercase tracking-widest">
                     <ShieldCheck size={16} className="text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" /> Réservez via WhatsApp, Payez en Boutique
                   </div>
                   <div className="flex gap-2 items-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                      {/* Apple Pay */}
                      <div className="h-7 px-3 bg-white rounded flex items-center justify-center text-[11px] font-black text-black"> Pay</div>
                      {/* Visa */}
                      <div className="h-7 px-3 bg-white rounded flex items-center justify-center text-[13px] font-black italic text-[#1a1f71]">VISA</div>
                      {/* Mastercard CSS Mockup */}
                      <div className="h-7 w-12 bg-[#222] rounded flex items-center justify-center relative overflow-hidden">
                        <div className="absolute left-1.5 w-5 h-5 bg-[#eb001b] rounded-full z-10 mix-blend-screen opacity-90"></div>
                        <div className="absolute right-1.5 w-5 h-5 bg-[#f79e1b] rounded-full z-10 mix-blend-screen opacity-90"></div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
