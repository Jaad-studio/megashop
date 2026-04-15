import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Star, Camera, ExternalLink } from 'lucide-react';

const Footer = () => {
  const hours = [
    { day: 'Lundi', time: '10:30–20:00' },
    { day: 'Mardi', time: '10:30–20:00' },
    { day: 'Mercredi', time: '10:30–20:00' },
    { day: 'Jeudi', time: '10:30–20:00' },
    { day: 'Vendredi', time: '10:30–20:00' },
    { day: 'Samedi', time: '10:30–20:30' },
    { day: 'Dimanche', time: '13:30–18:30' },
  ];

  return (
    <footer className="relative bg-[#060606] overflow-hidden">
      {/* Top divider & glow */}
      <div className="section-divider" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-40 bg-gradient-to-b from-[#ff00ff]/8 to-transparent blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-16 md:pt-24 pb-10 md:pb-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-16 md:mb-20">

          {/* Column 1: Brand + Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gradient-main mb-3">
                MEGASHOP
              </h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Votre boutique premium de cigarettes électroniques, parfums et vêtements à Romans-sur-Isère.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=58+Pl+Jacquemart+26100+Romans-sur-Isère"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin size={18} className="text-[#ff00ff] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/80 font-medium text-sm group-hover:text-white transition-colors">58 Pl. Jacquemart</p>
                  <p className="text-white/40 text-xs">26100 Romans-sur-Isère</p>
                </div>
              </a>

              <a href="tel:0744253215" className="flex items-center gap-3 group">
                <Phone size={18} className="text-[#00f0ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-white/80 font-medium text-sm group-hover:text-white transition-colors">07 44 25 32 15</p>
              </a>

              <div className="flex items-center gap-3">
                <Star size={18} className="text-[#d4af37] flex-shrink-0" fill="currentColor" />
                <p className="text-white/80 font-medium text-sm">5 065 Avis clients</p>
              </div>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Clock size={18} className="text-[#ff00ff]" />
              <h4 className="text-lg font-bold uppercase tracking-wider text-white/90">Horaires</h4>
            </div>
            <ul className="space-y-2.5">
              {hours.map((h, i) => (
                <li key={i} className="flex justify-between items-center text-sm py-1.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-white/50 font-medium">{h.day}</span>
                  <span className="font-bold text-[#00f0ff]/90 tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4 font-medium">
              Horaires susceptibles de changer les jours fériés
            </p>
          </div>

          {/* Column 3: Social + Quick Links */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-lg font-bold uppercase tracking-wider text-white/90 mb-5">Suivez-nous</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-[#ff00ff]/20 hover:border-[#ff00ff]/30 transition-all duration-300 group"
                >
                  <Camera size={18} className="text-white/50 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-[#00f0ff]/20 hover:border-[#00f0ff]/30 transition-all duration-300 group"
                >
                  <ExternalLink size={18} className="text-white/50 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold uppercase tracking-wider text-white/90 mb-4">Catégories</h4>
              <div className="flex flex-col gap-2">
                <Link to="/category/parfums-homme" className="text-sm text-white/40 hover:text-[#d4af37] transition-colors font-medium">
                  Parfums Homme
                </Link>
                <Link to="/category/parfums-femme" className="text-sm text-white/40 hover:text-[#ff5ca1] transition-colors font-medium">
                  Parfums Femme
                </Link>
                <Link to="/category/puffs" className="text-sm text-white/40 hover:text-[#00f0ff] transition-colors font-medium">
                  Puffs Premium
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-medium">
            © {new Date().getFullYear()} Megashop — Tous droits réservés
          </p>
          <p className="text-xs text-white/20 font-medium">
            Romans-sur-Isère, France
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
