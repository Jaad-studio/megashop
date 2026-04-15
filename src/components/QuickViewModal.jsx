import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuickViewModal = ({ isOpen, onClose, product, categoryColor = '#00f0ff' }) => {
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const imageRef = React.useRef(null);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize(null);
      setShowSizeError(false);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 600);
      return;
    }
    
    if (selectedSize) {
      addToCart({ ...product, name: `${product.name} (Taille: ${selectedSize})` });
    } else {
      addToCart(product);
    }
    onClose();
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || window.innerWidth < 768) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex md:items-center justify-center items-end p-0 md:p-4"
           onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-4xl bg-[#0a0a0a] rounded-t-3xl md:rounded-3xl overflow-y-auto no-scrollbar shadow-[0_-15px_50px_rgba(0,0,0,0.8)] md:shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col md:flex-row relative max-h-[90vh]"
            onClick={e => e.stopPropagation()}
            style={{ boxShadow: `0 0 40px ${categoryColor}20` }}
          >
            {/* Grab Handle for Bottom Sheet (Mobile Only) */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full md:hidden z-20"></div>

            <button onClick={onClose} className="absolute top-4 right-4 z-[99] w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10">
              <X size={20} />
            </button>
            <div 
              className="w-full md:w-1/2 h-[50vh] md:h-auto bg-[#0e0e0e] relative flex flex-col items-center justify-center pt-8 pb-4 group overflow-hidden md:cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { if (imageRef.current) imageRef.current.style.transformOrigin = "50% 50%"; }}
            >
              <img ref={imageRef} src={mainImage || product.image} alt={product.name} className="w-[80%] h-[70%] lg:h-[80%] object-contain drop-shadow-2xl transition-transform duration-[400ms] ease-out md:group-hover:scale-[1.8] relative z-10" />
              {product.badge && (
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-wider backdrop-blur-md border bg-black/40 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {product.badge}
                </div>
              )}
              {product.gallery && product.gallery.length > 0 && (
                <div className="mt-auto flex items-center justify-center gap-3 w-full px-4 no-scrollbar">
                  {product.gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${mainImage === img ? 'opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-100'} bg-black/40 cursor-pointer`}
                      style={mainImage === img ? { borderColor: categoryColor } : {}}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-gradient-to-br from-[#0e0e0e] to-[#0a0a0a]">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">{product.name}</h2>
              <p className="font-black text-2xl mb-6" style={{ color: categoryColor, dropShadow: `0 0 10px ${categoryColor}` }}>{product.price}</p>
              
              <div className="text-white/60 text-sm md:text-base leading-relaxed mb-8 flex-1">
                Une exclusivité soigneusement sélectionnée par l'équipe Megashop. Ses détails exceptionnels et sa qualité premium en font un choix incontournable pour les connaisseurs.
              </div>

              {product.sizes && (
                 <motion.div 
                   animate={showSizeError ? { x: [-5, 5, -5, 5, 0] } : {}}
                   transition={{ duration: 0.4 }}
                   className={`mb-8 p-2 rounded-2xl transition-colors ${showSizeError ? 'bg-red-500/20 shadow-[0_0_20px_rgba(255,0,0,0.3)]' : ''}`}
                 >
                   <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 px-1">Sélectionnez une taille</p>
                   <div className="flex gap-2">
                     {product.sizes.map(size => (
                       <button
                         key={size}
                         onClick={(e) => { e.stopPropagation(); setSelectedSize(size); setShowSizeError(false); }}
                         className={`flex-1 py-3 md:py-4 rounded-xl text-sm font-black transition-all duration-300 active:scale-95 ${selectedSize === size ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-black/40 text-white/40 hover:bg-white/10 hover:text-white/80'} border ${selectedSize === size ? 'border-white/50' : 'border-white/10'}`}
                       >
                         {size}
                       </button>
                     ))}
                   </div>
                 </motion.div>
              )}

              <div className="flex gap-3">
                <button 
                  onClick={handleAddToCart} 
                  className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 bg-white/10 border border-white/20 text-white hover:text-white"
                  style={{ '--hover-color': categoryColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${categoryColor}30`;
                    e.currentTarget.style.borderColor = categoryColor;
                    e.currentTarget.style.boxShadow = `0 0 20px ${categoryColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <ShoppingCart size={18} /> Ajouter au panier
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
