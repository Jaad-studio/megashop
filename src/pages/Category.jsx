import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Filter, Grid3X3, LayoutGrid, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { categoryData } from '../data/products';
import QuickViewModal from '../components/QuickViewModal';

const ProductCard = ({ item, i, data, viewMode, addToCart }) => {
  const [selectedFlavor, setSelectedFlavor] = useState(item.flavors ? item.flavors[0] : null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
      className="group h-full"
    >
      <div className="glass-card rounded-xl md:rounded-2xl overflow-hidden product-card-shine h-full flex flex-col">
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-[#0e0e0e] cursor-pointer ${viewMode === 'grid' ? 'aspect-[3/4]' : 'aspect-square'}`}
          onClick={() => setIsQuickViewOpen(true)}
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {item.badge && (
            <div
              className="absolute top-2.5 left-2.5 md:top-3 md:left-3 px-2 py-1 md:px-2.5 md:py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border"
              style={{
                background: data.colorBg,
                borderColor: `${data.color}25`,
                color: data.color,
              }}
            >
              {item.badge}
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hidden md:block z-[40]">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 backdrop-blur-md border transition-colors cursor-pointer"
              style={{
                background: `${data.color}20`,
                borderColor: `${data.color}40`,
                color: data.color,
              }}
            >
              <ShoppingCart size={14} />
              Commander
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 md:p-4 flex-1 flex flex-col relative z-20">
          <h3 className={`font-bold text-white/90 leading-tight mb-2 line-clamp-2 ${viewMode === 'grid' ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
            {item.name}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <span
              className={`font-black ${viewMode === 'grid' ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}
              style={{ color: data.color }}
            >
              {item.price}
            </span>

            {/* Mobile cart button */}
            <button
              onClick={handleAddToCart}
              className="md:hidden w-10 h-10 rounded-xl flex shrink-0 items-center justify-center border transition-all active:scale-95 cursor-pointer shadow-lg"
              style={{
                background: `${data.color}15`,
                borderColor: `${data.color}25`,
                color: data.color,
              }}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedFlavor ? { ...item, name: `${item.name} - ${selectedFlavor}` } : item}
        categoryColor={data.color}
      />
    </motion.div>
  );
};

function Category() {
  const { type } = useParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'
  const [filterBadge, setFilterBadge] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);



  const data = categoryData[type] || categoryData.puffs;

  // Extract unique badges for filtering
  const availableBadges = [...new Set(data.items.map(item => item.badge).filter(Boolean))];

  // Filter items
  const filteredItems = filterBadge === 'all'
    ? data.items
    : data.items.filter(item => item.badge === filterBadge);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#ff00ff] selection:text-white">
      <Navbar />

      {/* ═══ HEADER ═══ */}
      <header className="relative pt-28 pb-16 md:pt-40 md:pb-24 px-5 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full blur-[150px] opacity-15"
            style={{ background: data.color }}
          />
          <div className="absolute inset-0 noise-overlay opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/30 mb-6 md:mb-8"
          >
            <a href="/" className="hover:text-white/60 transition-colors">Accueil</a>
            <span>/</span>
            <span style={{ color: data.color }}>{data.title}</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border"
                style={{ color: data.color, borderColor: `${data.color}30`, background: data.colorBg }}
              >
                <Sparkles size={12} />
                {data.subtitle}
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] leading-[0.9] mb-4"
              style={{ color: data.color }}
            >
              {data.title}
            </h1>
            <p className="text-base md:text-lg text-white/40 font-medium max-w-xl">{data.desc}</p>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <p className="text-sm text-white/30 font-medium">
              <span className="font-bold text-white/60">{data.items.length}</span> produits
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-auto gap-4 md:gap-0">
              {/* Badge Filters */}
              {availableBadges.length > 0 && (
                <div className="flex w-full md:w-auto items-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  <button
                    onClick={() => setFilterBadge('all')}
                    className={`snap-start shrink-0 px-3 py-1.5 text-xs font-bold uppercase rounded-lg border transition-all whitespace-nowrap ${filterBadge === 'all' ? 'bg-white/20 border-white/40 text-white' : 'border-white/10 text-white/40 hover:text-white/80'} `}
                  >
                    Tout
                  </button>
                  {availableBadges.map(badge => (
                    <button
                      key={badge}
                      onClick={() => setFilterBadge(badge)}
                      className={`snap-start shrink-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all whitespace-nowrap ${filterBadge === badge ? 'bg-white/10 text-white' : 'border-white/10 text-white/40 hover:text-white/80'}`}
                      style={filterBadge === badge ? { borderColor: data.color, color: data.color } : {}}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                      ? 'bg-white/10 text-white'
                      : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                    }`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'compact'
                      ? 'bg-white/10 text-white'
                      : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                    }`}
                >
                  <Grid3X3 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </header>

      {/* ═══ PRODUCTS GRID ═══ */}
      <section className="py-10 md:py-16 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid gap-4 md:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              }`}
          >
            {filteredItems.map((item, i) => (
              <ProductCard key={`${item.name}-${i}`} item={item} i={i} data={data} viewMode={viewMode} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-base md:text-lg text-white/40 font-medium mb-6">
              Tous nos produits sont disponibles en boutique.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:0744253215"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: `${data.color}40`,
                  color: data.color,
                  background: `${data.color}10`,
                }}
              >
                Appeler la boutique
              </a>
              <a
                href="https://maps.google.com/?q=58+Pl+Jacquemart+26100+Romans-sur-Isère"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.02]"
              >
                Nous trouver
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Category;
