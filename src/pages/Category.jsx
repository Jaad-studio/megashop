import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Filter, Grid3X3, LayoutGrid, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

function Category() {
  const { type } = useParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const categoryData = {
    'parfums-homme': {
      title: 'Parfums Homme',
      subtitle: 'Fragrances masculines Dubaï',
      color: '#d4af37',
      colorBg: 'rgba(212, 175, 55, 0.1)',
      desc: 'Découvrez notre sélection de parfums masculins prestigieux importés directement de Dubaï.',
      items: [
        { name: 'Fakhar Lattafa', price: '35€', image: '/products/parfum_fakhar_corrected_1775591618834.png', badge: 'Premium' },
        { name: 'Ameerat Al Arab', price: '35€', image: '/products/parfum_ameerat_corrected_1775591719341.png', badge: 'Royal' },
        { name: 'Prideful Volaré', price: '35€', image: '/products/parfum_volare_prideful_1775592377311.png', badge: 'Élégant' },
        { name: 'Rosso Lychee', price: '35€', image: '/products/parfum_gulf_orchid_rosso_1775591638969.png', badge: 'Rare' },
        { name: 'Léonie Intense', price: '35€', image: '/products/parfum_leonie_1775591655798.png', badge: 'Exclusif' },
      ],
    },
    'parfums-femme': {
      title: 'Parfums Femme',
      subtitle: 'Fragrances féminines Dubaï',
      color: '#ff5ca1',
      colorBg: 'rgba(255, 92, 161, 0.1)',
      desc: 'Découvrez notre collection raffinée de parfums féminins aux notes envoûtantes de Dubaï.',
      items: [
        { name: 'Kenzie Marshmallow Dream', price: '35€', image: '/products/parfum_volare_kenzie_1775592394045.png', badge: 'Rêve' },
        { name: 'Yara Candy Lattafa', price: '35€', image: '/products/parfum_lattafa_yara_candy_1775592421301.png', badge: 'Gourmand' },
        { name: 'Yara Lattafa', price: '35€', image: '/products/parfum_lattafa_yara_1775592406921.png', badge: 'Iconique' },
        { name: 'La Vivacité', price: '35€', image: '/products/parfum_alhambra_vivacite_1775592440080.png', badge: 'Vibrant' },
        { name: 'Rave Now Women', price: '35€', image: '/products/parfum_rave_now_1775592456747.png', badge: 'Moderne' },
        { name: 'Ameerat Al Arab Prive Rose', price: '35€', image: '/products/parfum_ameerat_corrected_1775591719341.png', badge: 'Floral' },
        { name: 'Aïsha Absolue Collection Privée', price: '35€', image: '/products/parfum_aisha_1775589064630.png', badge: 'Magique' },
        { name: 'Rose Bonbon', price: '35€', image: '/products/parfum_rose_bonbon_1775591686863.png', badge: 'Doux' },
        { name: 'Musk Collection Cotton Candy', price: '35€', image: '/products/parfum_musk_collection_1775591701197.png', badge: 'Sucré' },
        { name: 'Musk Collection Blueberry', price: '35€', image: '/products/parfum_musk_collection_1775591701197.png', badge: 'Frais' },
      ],
    },
    puffs: {
      title: 'Puffs',
      subtitle: 'Vapotage nouvelle génération',
      color: '#00f0ff',
      colorBg: 'rgba(0, 240, 255, 0.1)',
      desc: 'Une sélection rigoureuse des meilleures saveurs et designs de puffs premium.',
      items: [
        { name: 'Aerox 32k Strawberry Kiwi', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Intense' },
        { name: 'Kong Max 30k Raspberry Watermelon Ice', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Frais' },
        { name: 'Kong Max 30k Raspberry Watermelon', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Frais' },
        { name: 'Crown Bar 30k Ice Blue', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Glacé' },
        { name: 'Crown Bar 30k Magic Love', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Mystique' },
        { name: 'Crown Bar 30k Lemon Mint', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Rafraîchissant' },
        { name: 'Crown Bar 30k Cherry Fizz', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Pétillant' },
        { name: 'Crown Bar 30k Strawberry Punch', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Puissant' },
        { name: 'Crown Bar 30k Mixed Berry', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Classique' },
        { name: 'Razz Bar 30k+ Blueberry Sour Raspberry', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Premium' },
        { name: 'Razz Bar 30k+ Strawberry Watermelon', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Intense' },
        { name: 'Razz Bar 30k+ Pineapple Mango', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Tropical' },
        { name: 'Razz Bar 30k+ Strawberry Banana', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Doux' },
        { name: 'Razz Bar 30k+ Strawberry Ice', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Frais' },
        { name: 'Razz Bar 30k+ Blueberry Ice', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Glacé' },
        { name: 'Falcon JNR 30K Strawberry Ice', price: '20€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Frais' },
        { name: 'Falcon JNR 30K Watermelon Mango Peach', price: '20€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Exotique' },
        { name: 'Falcon JNR 30K Strawberry Watermelon Ice', price: '20€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Intense' },
        { name: 'Falcon JNR 30K Blueberry Raspberry Cherry', price: '20€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Mixte' },
        { name: 'Falcon JNR 30K Mixed Berries', price: '20€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Classique' },
        { name: 'RandM T9000 Summer Peach Ice', price: '10€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Doux' },
        { name: 'RandM T9000 Cherry Ice', price: '10€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Pétillant' },
        { name: 'RandM T9000 Black Dragon Ice', price: '10€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Mystique' },
        { name: 'RandM T9000 Peach Mango Pineapple', price: '10€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Tropical' },
        { name: 'Fumot Leopard 40K', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Maxi' },
      ],
    },
    tshirts: {
      title: 'T-Shirts',
      subtitle: 'Collection streetwear limitée',
      color: '#ff00ff',
      colorBg: 'rgba(255, 0, 255, 0.1)',
      desc: 'Des tissus technologiques au design exceptionnel pour un style urbain unique.',
      items: [
        { name: 'T-Shirt Qualité', price: '49€', image: '/fashion_clothes_paris.png', badge: 'Classique' },
        { name: 'Coton Stellaire', price: '59€', image: '/fashion_clothes_paris.png', badge: 'Doux' },
        { name: 'T-Shirt Magnétique', price: '80€', image: '/fashion_clothes_paris.png', badge: 'Innovant' },
      ],
    },
  };

  const data = categoryData[type] || categoryData.puffs;

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

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white/10 text-white'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  viewMode === 'compact'
                    ? 'bg-white/10 text-white'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
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
            className={`grid gap-4 md:gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}
          >
            {data.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                className="group"
              >
                <div className="glass-card rounded-xl md:rounded-2xl overflow-hidden product-card-shine h-full flex flex-col">
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-[#0e0e0e] ${viewMode === 'grid' ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
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

                    {/* Hover CTA */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(item);
                        }}
                        className="w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 backdrop-blur-md border transition-colors"
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
                  <div className="p-3 md:p-4 flex-1 flex flex-col">
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
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(item);
                        }}
                        className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                        style={{
                          background: `${data.color}15`,
                          borderColor: `${data.color}25`,
                          color: data.color,
                        }}
                      >
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
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
