import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, MapPin, Phone, Star, ChevronRight, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BestSellersCarousel from '../components/BestSellersCarousel';

/* ─── Floating Particles (Lighter, performance-optimized) ─── */
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: Math.random() * 12 + 8,
        isPink: i % 3 !== 0,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.isPink ? '#ff00ff' : '#00f0ff',
            boxShadow: `0 0 ${p.size * 4}px ${p.isPink ? 'rgba(255,0,255,0.5)' : 'rgba(0,240,255,0.5)'}`,
          }}
          animate={{
            y: [0, -(Math.random() * 120 + 40), 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

/* ─── Entry Loader ─── */
const EntryLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: 'easeInOut' }}
      onAnimationComplete={() => setVisible(false)}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, filter: 'blur(20px)' }}
        animate={{ scale: [0.6, 1, 1.5], opacity: [0, 1, 0], filter: ['blur(20px)', 'blur(0px)', 'blur(10px)'] }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="relative"
      >
        <span className="text-[14vw] md:text-[10vw] font-black text-gradient-main tracking-[-0.06em] select-none">
          MEGASHOP
        </span>
      </motion.div>
    </motion.div>
  );
};

/* ─── Marquee Banner ─── */
const MarqueeBanner = ({ text, reverse = false }) => {
  return (
    <div className="relative overflow-hidden py-3 md:py-4 border-y border-white/[0.04] bg-[#0a0a0a]">
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 25, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(20)].map((_, i) => (
          <span key={i} className="mx-6 md:mx-10 text-sm md:text-base font-bold tracking-[0.15em] uppercase text-white/15 flex items-center gap-3 md:gap-4">
            <Sparkles size={12} className="text-[#ff00ff]/30" />
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Category Card ─── */
const CategoryCard = ({ title, subtitle, image, link, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={link} className="group block relative">
        <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden product-card-shine">
          {/* Image */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[#0e0e0e]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

            {/* Badge */}
            <div
              className="absolute top-4 left-4 md:top-5 md:left-5 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-md border"
              style={{
                background: `${color}15`,
                borderColor: `${color}30`,
                color: color,
              }}
            >
              Collection
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-7">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-gradient-main transition-colors mb-1">
              {title}
            </h3>
            <p className="text-sm text-white/40 font-medium mb-4">{subtitle}</p>

            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300 group-hover:gap-3" style={{ color }}>
              Découvrir
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ─── Gallery Reveal Section ─── */
const GallerySection = ({ src, title, highlight, subtitle }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scale = useTransform(scrollYProgress, [0.15, 0.5], [1.15, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0.3]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ scale, opacity: imgOpacity }} className="absolute inset-0 will-change-transform">
        <img src={src} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-5"
      >
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#ff00ff]/70 mb-3 md:mb-4">
          {subtitle}
        </span>
        <h3 className="text-5xl sm:text-6xl md:text-[7vw] lg:text-[6vw] font-black leading-[0.9] uppercase tracking-[-0.04em]">
          <span className="text-white">{title}</span>
          <br />
          <span className="text-gradient-main">{highlight}</span>
        </h3>
      </motion.div>
    </section>
  );
};

/* ─── FAQ Accordion Item ─── */
const FaqItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-xl md:rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 md:px-7 md:py-5 flex items-center justify-between gap-4"
      >
        <h4 className="text-sm md:text-base font-bold text-white/90">{question}</h4>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#ff00ff] flex-shrink-0"
        >
          <Zap size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="px-5 pb-5 md:px-7 md:pb-6 text-sm text-white/50 leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════ */
function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const faqs = [
    { question: 'Puis-je commander en ligne ?', answer: 'Pour le moment, nous vous invitons à venir directement en boutique pour découvrir nos produits en exclusivité.' },
    { question: 'Quels sont les produits disponibles ?', answer: 'Nous proposons une large sélection incluant des puffs, des parfums haut de gamme et des vêtements stylisés.' },
    { question: 'La boutique est-elle ouverte les jours fériés ?', answer: 'Les horaires peuvent varier les jours fériés. N\'hésitez pas à nous appeler avant votre visite.' },
    { question: 'Où se trouve la boutique ?', answer: '58 Place Jacquemart, 26100 Romans-sur-Isère. En plein centre-ville, facile d\'accès !' },
  ];

  const categories = [
    {
      title: 'Parfums Homme',
      subtitle: 'Fragrances masculines Dubaï',
      image: '/parfum_homme_hero.png',
      link: '/category/parfums-homme',
      color: '#d4af37',
    },
    {
      title: 'Parfums Femme',
      subtitle: 'Fragrances féminines Dubaï',
      image: '/products/parfum_lattafa_yara_candy_1775592421301.png',
      link: '/category/parfums-femme',
      color: '#ff5ca1',
    },
    {
      title: 'Puffs',
      subtitle: 'Vapotage nouvelle génération',
      image: '/puff_jnr.png',
      link: '/category/puffs',
      color: '#00f0ff',
    },
    {
      title: 'T-Shirts',
      subtitle: 'Collection streetwear limitée',
      image: '/fashion_clothes_paris.png',
      link: '/category/tshirts',
      color: '#ff00ff',
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#ff00ff] selection:text-white">
      <EntryLoader />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Layers */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 bg-black">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/8 via-[#000000] to-[#00f0ff]/8 animate-fluid-bg" />
          <FloatingParticles />
          {/* Noise texture */}
          <div className="absolute inset-0 noise-overlay opacity-60" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#000000] to-transparent" />
        </motion.div>

        {/* Spline UFO 3D */}
        <div 
          className="absolute top-[10%] md:top-[5%] z-[10] w-full h-[50vh] md:h-[60vh] pointer-events-none flex items-center justify-center opacity-90 mix-blend-screen"
        >
          <iframe
            src="https://my.spline.design/wobblingufo-aVOXKJbUvBO9RGJWe7CDrMWQ/"
            frameBorder="0"
            className="w-[140vw] md:w-[90vw] lg:w-[70vw] h-full mix-blend-screen"
            title="Spline UFO"
            loading="lazy"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-[20] flex flex-col items-center text-center px-5 max-w-5xl w-full mt-[15vh] md:mt-[20vh]">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-white/60 tracking-wide">
              <Sparkles size={14} className="text-[#ff00ff]" />
              Romans-sur-Isère
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[13vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.88] tracking-[-0.05em] uppercase mb-4 md:mb-6"
          >
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Viens</span>
            <br />
            <span className="text-gradient-main drop-shadow-[0_0_30px_rgba(255,0,255,0.5)]">Shopper</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/40 font-medium max-w-xl leading-relaxed mb-8 md:mb-10"
          >
            Parfums de Dubaï, puffs premium et streetwear exclusif. L'expérience shopping galactique.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              to="/category/parfums-homme"
              className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] text-white px-7 py-3.5 md:px-9 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base uppercase tracking-wide hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              <ShoppingBag size={18} />
              Commander
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#concept"
              className="flex items-center justify-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white/70 px-7 py-3.5 md:px-9 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base uppercase tracking-wide hover:bg-white/[0.1] hover:text-white transition-all duration-300"
            >
              Notre concept
            </a>
          </motion.div>
        </div>

        {/* Floating Product Image – Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute z-[15] top-[15%] md:top-[20%] left-[2%] md:left-[5%] w-[35vw] sm:w-[25vw] md:w-[16vw] lg:w-[12vw] pointer-events-none"
        >
          <img
            src="/puff_jnr.png"
            alt="Puff Premium"
            className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.6)] animate-float"
          />
        </motion.div>

        {/* Shark Video – Right */}
        <div className="absolute z-[12] top-[20%] md:top-[25%] right-[-8%] md:right-[5%] w-[40vw] md:w-[28vw] lg:w-[22vw] pointer-events-none opacity-60 md:opacity-70">
          <video
            src="/shark_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-contain contrast-[1.5] brightness-90"
            style={{
              WebkitMaskImage: 'radial-gradient(circle, black 25%, transparent 65%)',
              maskImage: 'radial-gradient(circle, black 25%, transparent 65%)',
            }}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[20]"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-white/60"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <MarqueeBanner text="🔥 NOUVELLE COLLECTION DUBAÏ • BEST-SELLER PUFFS JNR EN STOCK 🔥 LIVRAISON 48H" />

      {/* ═══ BEST-SELLERS CAROUSEL ═══ */}
      <BestSellersCarousel />

      {/* ═══ CATEGORIES SECTION ═══ */}
      <section id="concept" className="py-16 md:py-28 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#ff00ff]/60 mb-3 block">
              Nos Collections
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.04em]">
              <span className="text-white">Explore</span>{' '}
              <span className="text-gradient-main">l'univers</span>
            </h2>
          </motion.div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.title} {...cat} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      <MarqueeBanner text="Nouvelles Saveurs — Collection Néon Limitée" reverse />

      {/* ═══ GALLERY SECTIONS ═══ */}
      <div className="relative z-10">
        <GallerySection
          src="/casa_de_papel_megashop.png"
          title="Top"
          highlight="Puffs"
          subtitle="Le braquage de la vape"
        />

        <div className="section-divider" />

        <GallerySection
          src="/parfum_dubai_luxury.png"
          title="Nos"
          highlight="Parfums"
          subtitle="Fragrances de Dubaï"
        />

        <div className="section-divider" />

        <GallerySection
          src="/fashion_clothes_paris.png"
          title="Collection"
          highlight="Paris"
          subtitle="La ville de la mode"
        />
      </div>

      {/* ═══ INFO + FAQ SECTION ═══ */}
      <section id="infos" className="py-16 md:py-28 px-5 md:px-12 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-48 bg-[#ff00ff]/6 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#00f0ff]/60 mb-3 block">
              Informations
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.04em]">
              <span className="text-white">Nous</span>{' '}
              <span className="text-gradient-main">trouver</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Store Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/5 to-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#ff00ff]/10 flex items-center justify-center">
                    <ShoppingBag size={20} className="text-[#ff00ff]" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">Mega Shop</h3>
                    <p className="text-xs md:text-sm text-[#00f0ff]/70 font-semibold uppercase tracking-widest">Premium Store</p>
                  </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                  <a
                    href="https://maps.google.com/?q=58+Pl+Jacquemart+26100+Romans-sur-Isère"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group/link"
                  >
                    <MapPin size={18} className="text-[#ff00ff] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white/80 group-hover/link:text-white transition-colors text-sm md:text-base">58 Pl. Jacquemart</p>
                      <p className="text-white/40 text-xs md:text-sm">26100 Romans-sur-Isère</p>
                    </div>
                  </a>

                  <a href="tel:0744253215" className="flex items-center gap-3.5 group/link">
                    <Phone size={18} className="text-[#00f0ff] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white/80 group-hover/link:text-white transition-colors text-sm md:text-base">07 44 25 32 15</p>
                      <p className="text-white/40 text-xs md:text-sm">Contactez-nous directement</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5">
                    <Star size={18} className="text-[#d4af37] flex-shrink-0" fill="currentColor" />
                    <div>
                      <p className="font-semibold text-white/80 text-sm md:text-base">5 065 Avis Clients</p>
                      <p className="text-white/40 text-xs md:text-sm">Excellence confirmée</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-6 border-t border-white/[0.06]">
                  <a
                    href="https://maps.google.com/?q=58+Pl+Jacquemart+26100+Romans-sur-Isère"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff00ff] hover:text-white transition-colors uppercase tracking-wide"
                  >
                    Voir sur Google Maps
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map Embed Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-card rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.0!2d5.0518!3d45.0438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDAyJzM3LjciTiA1wrAwMycwNi40IkU!5e0!3m2!1sfr!2sfr!4v1!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Megashop Location"
                className="grayscale contrast-125 brightness-50 hover:grayscale-0 hover:brightness-75 transition-all duration-700"
              />
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-center mb-8 md:mb-10">
              Questions <span className="text-gradient-main">fréquentes</span>
            </h3>
            <div className="flex flex-col gap-3 md:gap-4">
              {faqs.map((faq, i) => (
                <FaqItem key={i} {...faq} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="relative py-20 md:py-32 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff]/10 via-transparent to-[#00f0ff]/10 animate-fluid-bg" />
        <div className="absolute inset-0 noise-overlay opacity-40" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[-0.04em] mb-5 md:mb-8">
              <span className="text-white">Prêt à</span>
              <br />
              <span className="text-gradient-main">shopper ?</span>
            </h2>
            <p className="text-base md:text-lg text-white/40 font-medium mb-8 md:mb-10 max-w-lg mx-auto">
              Viens découvrir nos collections exclusives directement en boutique.
            </p>
            <Link
              to="/category/parfums-homme"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg uppercase tracking-wide hover:shadow-[0_0_50px_rgba(255,0,255,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              <ShoppingBag size={20} />
              Commander
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}

export default Home;
