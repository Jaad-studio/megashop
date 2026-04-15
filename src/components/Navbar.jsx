import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ShoppingCart, Search, Phone, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopParfumsOpen, setDesktopParfumsOpen] = useState(false);
  const [mobileParfumsOpen, setMobileParfumsOpen] = useState(false);
  
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDesktopParfumsOpen(false);
    setMobileParfumsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-[250] transition-all duration-500 ${
          scrolled ? 'py-2 px-3 md:px-6' : 'py-3 px-4 md:px-8'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl md:rounded-3xl px-5 py-3 md:px-8 md:py-4 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/[0.06]'
              : 'bg-[#111111]/80 backdrop-blur-xl border border-white/[0.04]'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="relative group flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black tracking-[-0.05em] text-gradient-main">
              MEGASHOP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
             <div 
               className="relative"
               onMouseEnter={() => setDesktopParfumsOpen(true)}
               onMouseLeave={() => setDesktopParfumsOpen(false)}
             >
                <button className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 ${location.pathname.includes('parfums') ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                  Parfums <ChevronDown size={14} className={`transition-transform ${desktopParfumsOpen ? 'rotate-180':''}`}/>
                  {location.pathname.includes('parfums') && (
                    <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00f0ff]"/>
                  )}
                </button>
                <AnimatePresence>
                  {desktopParfumsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#111111] border border-white/10 rounded-xl p-2 shadow-2xl flex flex-col gap-1 z-50 backdrop-blur-2xl"
                    >
                      <Link to="/category/parfums-homme" className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#d4af37] text-sm font-bold uppercase tracking-wider text-center transition-colors">👨 Homme</Link>
                      <Link to="/category/parfums-femme" className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#ff5ca1] text-sm font-bold uppercase tracking-wider text-center transition-colors">👩 Femme</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             <Link to="/category/puffs" className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${location.pathname === '/category/puffs' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                Puffs
                {location.pathname === '/category/puffs' && <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00f0ff]"/>}
             </Link>
             <Link to="/category/streetwear" className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${location.pathname === '/category/streetwear' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                T-Shirts & Ensembles
                {location.pathname === '/category/streetwear' && <motion.div layoutId="nav-active" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00f0ff]"/>}
             </Link>
          </div>

          {/* Desktop CTA & Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:0744253215"
              className="flex items-center gap-2 group px-3 md:px-4 py-2 rounded-xl bg-transparent hover:bg-white/[0.03] transition-all duration-300 border border-transparent hover:border-white/[0.05]"
            >
              <div className="w-6 h-6 rounded-full bg-[#00f0ff]/10 flex items-center justify-center group-hover:bg-[#00f0ff]/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0)] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <Phone size={12} className="text-[#00f0ff]" />
              </div>
              <span className="text-xs md:text-sm font-bold font-mono tracking-widest text-white/60 group-hover:text-white transition-colors">
                07 44 25 32 15
              </span>
            </a>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] text-white/80 hover:text-white transition-colors border border-white/[0.08]"
              aria-label="Rechercher"
            >
              <Search size={18} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2.5 bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]"
            >
              <ShoppingCart size={18} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#00f0ff] rounded-full text-black text-[10px] font-black flex items-center justify-center border-2 border-[#111111]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search size={22} />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <ShoppingCart size={22} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#00f0ff] rounded-full text-black text-[9px] font-black flex items-center justify-center border-[1.5px] border-[#111111]">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative z-[110] flex flex-col gap-1.5 p-2 ${menuOpen ? 'hamburger-open' : ''}`}
              aria-label="Menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#ff00ff]/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex flex-col gap-4 text-center items-center w-full px-8">
               <button 
                 onClick={() => setMobileParfumsOpen(!mobileParfumsOpen)} 
                 className="flex flex-col items-center gap-2 text-4xl font-black uppercase tracking-tight text-white/80 hover:text-white py-2"
               >
                 <span className="flex items-center gap-2">Parfums <ChevronDown size={28} className={`transition-transform ${mobileParfumsOpen ? 'rotate-180':''}`}/></span>
               </button>
               <AnimatePresence>
                 {mobileParfumsOpen && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="flex flex-col gap-3 w-full max-w-[200px]"
                   >
                     <Link to="/category/parfums-homme" className="bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] py-3 rounded-2xl font-bold uppercase tracking-wider text-sm transition-transform active:scale-95">👨 Homme</Link>
                     <Link to="/category/parfums-femme" className="bg-[#ff5ca1]/20 border border-[#ff5ca1]/30 text-[#ff5ca1] py-3 rounded-2xl font-bold uppercase tracking-wider text-sm transition-transform active:scale-95">👩 Femme</Link>
                   </motion.div>
                 )}
               </AnimatePresence>

               <Link to="/category/puffs" className="block text-4xl font-black uppercase tracking-tight text-white py-2 drop-shadow-md">Puffs</Link>
               <Link to="/category/streetwear" className="block text-4xl font-black uppercase tracking-tight text-white py-2 drop-shadow-md text-center">T-Shirts & Streetwear</Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <a href="tel:0744253215" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] font-bold tracking-widest text-lg">
                 <Phone size={18} /> 07 44 25 32 15
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
      
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
