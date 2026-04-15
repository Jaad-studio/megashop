import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingCart, Sparkles } from 'lucide-react';
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

  // --- AI Semantic Engine ---
  const STOP_WORDS = ['je', 'cherche', 'un', 'une', 'des', 'le', 'la', 'les', 'pour', 'avec', 'et', 'ou', 'de', 'du', 'je veux', 'svp', 'salut', 'bonjour'];

  const getSemanticTags = (item, catTitle) => {
    const tags = [catTitle.toLowerCase(), item.badge?.toLowerCase() || ''];
    const name = item.name.toLowerCase();
    
    // Inferred Categories
    if (name.includes('femme') || catTitle.includes('Femme')) tags.push('fille', 'meuf', 'cadeau pour elle', 'doux', 'floral', 'feminin');
    if (name.includes('homme') || catTitle.includes('Homme')) tags.push('garçon', 'mec', 'cadeau pour lui', 'fort', 'boise', 'masculin');
    if (name.includes('mixte')) tags.push('unisexe', 'les deux', 'cadeau', 'couple');
    if (catTitle.includes('Puffs')) tags.push('fumer', 'vape', 'cigarette', 'electronique', 'gout', 'fraise', 'fruit', 'ce</', 'chicha');
    if (catTitle.includes('Vêtements')) tags.push('habit', 'pull', 'pantalon', 'jogging', 'survetement', 'froid', 'hiver', 'tshirt', 'sape', 'ensemble');
    
    // Inferred Sensations
    const badge = item.badge || '';
    if (badge === 'Gourmand' || name.includes('vanilla') || name.includes('sugar')) tags.push('bonbon', 'sucre', 'caramel', 'vanille', 'miam', 'gourmand', 'delicieux');
    if (badge === 'Frais' || badge === 'Glacé' || name.includes('ice') || name.includes('breez')) tags.push('ete', 'mer', 'menthe', 'glace', 'froid', 'rafraichissant');
    if (badge === 'Floral' || name.includes('rose')) tags.push('fleur', 'rose', 'printemps', 'nature');
    if (badge === 'Fruité' || name.includes('apple') || name.includes('peach') || name.includes('cherry')) tags.push('fruit', 'pomme', 'peche', 'cerise', 'myrtille', 'froid', 'sucre');
    
    return tags.join(' ');
  };

  const flattenProducts = Object.entries(categoryData).flatMap(([catKey, cat]) =>
    cat.items.map(item => ({
      ...item,
      categoryKey: catKey,
      categoryTitle: cat.title,
      color: cat.color,
      semanticBlob: `${item.name.toLowerCase()} ${getSemanticTags(item, cat.title)}`
    }))
  );

  const [aiTyping, setAiTyping] = useState(false);

  // Filter logic (Semantic Scoring)
  const getSemanticMatches = () => {
    if (query.trim() === '') return [];
    
    let sanitizedQuery = query.toLowerCase();
    STOP_WORDS.forEach(sw => {
      sanitizedQuery = sanitizedQuery.replace(new RegExp(`\\b${sw}\\b`, 'g'), '');
    });
    
    const searchTerms = sanitizedQuery.split(' ').filter(word => word.length > 2);
    if (searchTerms.length === 0 && sanitizedQuery.length > 0) searchTerms.push(sanitizedQuery.trim());

    const scoredItems = flattenProducts.map(p => {
      let score = 0;
      searchTerms.forEach(term => {
        if (p.name.toLowerCase().includes(term)) score += 3; // Exact name match is heavily weighted
        else if (p.badge && p.badge.toLowerCase().includes(term)) score += 2; // Badge match
        else if (p.flavors && p.flavors.some(f => f.toLowerCase().includes(term))) score += 2; // Flavor match
        else if (p.semanticBlob.includes(term)) score += 1; // Hidden logic/tags match
      });
      return { ...p, score };
    });

    return scoredItems.filter(p => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);
  };

  const filteredProducts = getSemanticMatches();

  useEffect(() => {
    if (query.length > 0) {
      setAiTyping(true);
      const timeout = setTimeout(() => setAiTyping(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [query]);

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
            <div className={`relative group transition-all duration-500 ease-out ${query ? 'shadow-[0_0_50px_rgba(255,0,255,0.15)] ring-1 ring-[#ff00ff]/30' : 'shadow-[0_0_30px_rgba(0,0,0,0.5)]'} rounded-2xl bg-[#111111]/80 backdrop-blur-xl border border-white/10`}>
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Sparkles size={22} className={`transition-all duration-300 ${query ? 'text-[#ff00ff] animate-pulse' : 'text-[#00f0ff]'}`} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Demandez à l'IA (ex: un parfum sucré pour fille)..."
                className="w-full bg-transparent border-none rounded-2xl py-5 pl-14 pr-14 text-sm md:text-lg text-white placeholder-white/30 focus:outline-none focus:ring-0"
              />
              <button 
                onClick={onClose}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              {/* Animated Progress bar */}
               <motion.div 
                 initial={{ width: '0%' }}
                 animate={{ width: aiTyping ? '100%' : '0%', opacity: aiTyping ? 1 : 0 }}
                 transition={{ duration: 0.3 }}
                 className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#d4af37] rounded-full"
               />
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
                    <Sparkles size={40} className="mx-auto mb-3 opacity-20" />
                    <p>L'IA n'a trouvé aucun match pour "{query}"</p>
                    <p className="text-sm text-white/30 mt-2">Essayez de décrire ce que vous cherchez (ex: hiver, frais, sucré...)</p>
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
