import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ShoppingCart, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Parfums Homme', to: '/category/parfums-homme' },
    { label: 'Parfums Femme', to: '/category/parfums-femme' },
    { label: 'Puffs', to: '/category/puffs' },
    { label: 'T-Shirts', to: '/category/tshirts' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
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
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border border-white/10 rounded px-1.5 py-0.5">
              Premium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 group ${
                  location.pathname === link.to
                    ? 'text-white bg-white/[0.08]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#00f0ff]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:0744253215"
              className="text-sm font-semibold text-white/40 hover:text-white/70 transition-colors"
            >
              07 44 25 32 15
            </a>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] text-white/80 hover:text-white transition-colors border border-white/[0.08]"
              aria-label="Rechercher"
            >
              <Search size={18} />
            </button>

            <Link
              to="/category/parfums-homme"
              className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-colors border border-white/[0.08]"
            >
              <ShoppingBag size={16} />
              Boutique
            </Link>
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
            className="fixed inset-0 z-[95] bg-[#0a0a0a]/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-2"
          >
            {/* Decorative glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#ff00ff]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.to}
                  className="block text-4xl font-black uppercase tracking-tight text-white/80 hover:text-white py-4 px-8 rounded-2xl hover:bg-white/5 transition-all text-center"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <a
                href="tel:0744253215"
                className="text-lg font-semibold text-[#00f0ff]"
              >
                07 44 25 32 15
              </a>
              <Link
                to="/category/parfums-homme"
                className="flex items-center gap-2 bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] text-white px-8 py-3 rounded-xl font-bold text-base uppercase tracking-wide"
              >
                <ShoppingBag size={18} />
                Boutique
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
