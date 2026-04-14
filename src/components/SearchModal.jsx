import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingCart } from 'lucide-react';
import { categoryData } from '../data/products';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Flatten all products
  const allProducts = Object.entries(categoryData).flatMap(([catKey, cat]) =>
    cat.items.map(item => ({
      ...item,
      categoryKey: catKey,
      categoryTitle: cat.title,
      color: cat.color
    }))
  );

  // Filter logic
  const filteredProducts = query.trim() === '' 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        (p.flavors && p.flavors.some(f => f.toLowerCase().includes(query.toLowerCase())))
      ).slice(0, 8); // limit to 8 results for performance/UI

  const handleProductClick = (catKey) => {
    onClose();
    navigate(`/category/${catKey}`);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    if (item.flavors) {
      addToCart({ ...item, name: `${item.name} - ${item.flavors[0]}` });
    } else {
      addToCart(item);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-start pt-20 md:pt-32 px-4"
        >
          {/* Close Area (Click outside) */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          {/* Search Container */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl relative z-10"
          >
            {/* Input Wrapper */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search size={24} className="text-white/50 group-focus-within:text-[#00f0ff] transition-colors" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un parfum, une puff..."
                className="w-full bg-[#111111]/80 border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-lg md:text-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/50 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
              <button 
                onClick={onClose}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Results Area */}
            {query.trim() !== '' && (
              <div className="mt-4 bg-[#111111]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto hide-scrollbar">
                {filteredProducts.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {filteredProducts.map((product, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={`${product.name}-${i}`}
                        className="p-4 flex items-center gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                        onClick={() => handleProductClick(product.categoryKey)}
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-black overflow-hidden shrink-0 border border-white/5">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-base truncate">{product.name}</h4>
                          <span className="text-xs uppercase tracking-wider font-bold mt-1 inline-block" style={{ color: product.color }}>
                            {product.categoryTitle}
                          </span>
                        </div>

                        {/* Price & Action */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="font-black text-lg text-white">{product.price}</span>
                          <button 
                            onClick={(e) => handleAddToCart(e, product)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#00f0ff]/20 flex items-center justify-center text-white/70 hover:text-[#00f0ff] transition-colors border border-white/10 hover:border-[#00f0ff]/30"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-white/50">
                    <Search size={40} className="mx-auto mb-3 opacity-20" />
                    <p>Aucun produit trouvé pour "{query}"</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
