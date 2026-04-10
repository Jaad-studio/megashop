import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
    { label: 'Parfums', to: '/category/parfums' },
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
            <Link
              to="/category/parfums"
              className="flex items-center gap-2 bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              <ShoppingBag size={16} />
              Boutique
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden relative z-[110] flex flex-col gap-1.5 p-2 ${menuOpen ? 'hamburger-open' : ''}`}
            aria-label="Menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
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
                to="/category/parfums"
                className="flex items-center gap-2 bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] text-white px-8 py-3 rounded-xl font-bold text-base uppercase tracking-wide"
              >
                <ShoppingBag size={18} />
                Boutique
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
