import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Lock, CheckCircle2, Box } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState('relay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingCost = shippingMethod === 'relay' ? 4.90 : 7.90;
  const finalTotal = cartTotal + shippingCost;

  const handleFakePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        // Fallback to whatsapp after success animation to keep their flow alive temporarily.
        const text = `Commande test V.I.P générée par l'IA Megashop ! Total: ${finalTotal.toFixed(2)}€`;
        window.open(`https://wa.me/33744253215?text=${encodeURIComponent(text)}`, '_blank');
        navigate('/');
      }, 2000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 flex items-center justify-center">
            <CheckCircle2 size={48} className="text-[#00f0ff]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider">Paiement Validé</h1>
          <p className="text-white/50 text-lg">Cette page est une simulation de démonstration.<br/>Redirection sécurisée...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-[#ff00ff]/30">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Form */}
        <div className="flex-1 w-full p-6 md:p-12 lg:py-20 lg:pr-20 border-r border-[#ffffff]/5 relative z-10">
          
          {/* Header */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group text-sm font-medium">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Retour à la boutique
          </button>

          <h1 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            Paiement Sécurisé <ShieldCheck className="text-[#00f0ff]" size={28} />
          </h1>

          <form onSubmit={handleFakePayment} className="space-y-10">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-bold text-white/90 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">1. Coordonnées</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Prénom" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#ff00ff]/50 focus:ring-1 focus:ring-[#ff00ff]/50 transition-all outline-none" />
                  <input required type="text" placeholder="Nom" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#ff00ff]/50 focus:ring-1 focus:ring-[#ff00ff]/50 transition-all outline-none" />
                </div>
                <input required type="email" placeholder="Adresse e-mail" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#ff00ff]/50 focus:ring-1 focus:ring-[#ff00ff]/50 transition-all outline-none" />
                <input required type="tel" placeholder="Téléphone (ex: 06...)" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#ff00ff]/50 focus:ring-1 focus:ring-[#ff00ff]/50 transition-all outline-none" />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-lg font-bold text-white/90 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">2. Mode de livraison</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${shippingMethod === 'relay' ? 'border-[#00f0ff] bg-[#00f0ff]/5' : 'border-white/10 hover:border-white/20 bg-black'}`}>
                  <input type="radio" value="relay" checked={shippingMethod === 'relay'} onChange={() => setShippingMethod('relay')} className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${shippingMethod === 'relay' ? 'border-[#00f0ff]' : 'border-white/30'}`}>
                    {shippingMethod === 'relay' && <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">Point Relais (Mondial Relay, Shop2Shop)</p>
                    <p className="text-sm text-white/50">Livraison en 3-4 jours ouvrés. Le relais sera choisi après paiement.</p>
                  </div>
                  <p className="font-bold">4,90€</p>
                </label>
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${shippingMethod === 'home' ? 'border-[#00f0ff] bg-[#00f0ff]/5' : 'border-white/10 hover:border-white/20 bg-black'}`}>
                  <input type="radio" value="home" checked={shippingMethod === 'home'} onChange={() => setShippingMethod('home')} className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${shippingMethod === 'home' ? 'border-[#00f0ff]' : 'border-white/30'}`}>
                    {shippingMethod === 'home' && <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">Colissimo (À Domicile)</p>
                    <p className="text-sm text-white/50">Livraison en 48H directement chez vous.</p>
                  </div>
                  <p className="font-bold">7,90€</p>
                </label>
              </div>
            </section>

            {/* Payment (Fake Stripe) */}
            <section>
              <h2 className="text-lg font-bold text-white/90 uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
                <span>3. Paiement</span>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/50 flex items-center gap-1"><Lock size={10} /> Chiffré</span>
              </h2>
              <div className="bg-black border border-white/10 rounded-xl p-4 gap-4 flex flex-col">
                <input required type="text" placeholder="Numéro de carte" maxLength="19" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-white/30 font-mono tracking-widest" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/AA" maxLength="5" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-white/30 font-mono" />
                  <input required type="text" placeholder="CVC" maxLength="3" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-white/30 font-mono" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-5 rounded-xl font-black uppercase tracking-wider text-lg transition-all duration-300 shadow-[0_0_30px_rgba(255,0,255,0.2)] hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] flex items-center justify-center gap-2 ${isProcessing ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-gradient-to-r from-[#ff00ff] to-[#00f0ff] text-white hover:scale-[1.01]'}`}
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion à la banque...
                </div>
              ) : (
                `Payer ${finalTotal.toFixed(2)}€`
              )}
            </button>
            <p className="text-center text-xs text-white/30 mt-4 flex items-center justify-center gap-2">
              <Lock size={12} /> Vos données sont protégées par chiffrement 256-bits.
            </p>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[450px] bg-[#111111] p-6 md:p-12 lg:py-20 lg:pl-12 flex flex-col border-l border-white/5 z-10">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-8 text-white/80">Récapitulatif</h2>
          
          <div className="flex-1 overflow-y-auto mb-8 pr-2 custom-scrollbar">
            {cartItems.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-xl bg-black border border-white/10 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#ff00ff] rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white leading-tight">{item.name}</h4>
                  {(item.selectedSize || item.selectedFlavor) && (
                    <p className="text-xs text-[#00f0ff] font-bold mt-1 uppercase tracking-wider bg-[#00f0ff]/10 inline-block px-2 py-0.5 rounded-md">{item.selectedSize || item.selectedFlavor}</p>
                  )}
                </div>
                <p className="font-bold text-white shrink-0">{item.price}</p>
              </div>
            ))}
            
            {cartItems.length === 0 && (
              <p className="text-white/40 italic">Votre panier est vide.</p>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-sm text-white/60">
              <span>Sous-total</span>
              <span>{cartTotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Expédition</span>
              <span>{shippingCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-xl font-black text-white pt-4 border-t border-white/10 shadow-[0_-20px_20px_rgba(17,17,17,0.8)]">
              <span>Total</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00f0ff]">{finalTotal.toFixed(2)}€</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
