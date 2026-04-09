import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Camera, Globe, MapPin, Phone, Clock, Star, Zap, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

// Simple Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Only generate on client to prevent hydration errors, keeping it simple
    setParticles(Array.from({ length: 30 }));
  }, []);

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none mix-blend-screen">
      {particles.map((_, i) => {
        const isPink = i % 2 === 0;
        const size = Math.random() * 6 + 2;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full shadow-[0_0_15px_currentColor] ${isPink ? 'text-[#ff00ff] bg-[#ff00ff]' : 'text-[#00f0ff] bg-[#00f0ff]'}`}
            style={{ width: size, height: size, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, Math.random() * -150 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};

// Quick Entry Loader
const EntryLoader = () => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setComplete(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (complete) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-[#0c0c0c] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 5], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="text-[12vw] font-black text-[#ff00ff] tracking-tighter mix-blend-screen drop-shadow-[0_0_50px_rgba(255,0,255,0.8)]"
      >
        MEGASHOP
      </motion.div>
    </motion.div>
  );
};

// Reusable Marquee Component
const MarqueeBanner = ({ text, color = "bg-[#ff00ff]", textColor = "text-white", rotation = "rotate-[-2deg]", speed = 12 }) => {
  return (
    <div className={`relative z-40 overflow-hidden ${color} py-4 md:py-6 ${rotation} scale-110 shadow-2xl flex whitespace-nowrap border-y-2 md:border-y-4 border-[#0c0c0c]`}>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: speed, repeat: Infinity }} className={`flex text-2xl md:text-4xl font-black tracking-tight uppercase ${textColor}`}>
        {[...Array(15)].map((_, i) => (
          <span key={i} className="mx-6 flex items-center gap-6">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Slice Reveal (Le Rideau) Component with Holographic Laser Scanner effect
const SlicedRevealSection = ({ src, title, highlight, subtitle }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // 5 Slices arriving from bottom to top at different speeds
  const y1 = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], ["100%", "0%"]);
  const y3 = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
  const y4 = useTransform(scrollYProgress, [0.35, 0.65], ["100%", "0%"]);
  const y5 = useTransform(scrollYProgress, [0.25, 0.55], ["100%", "0%"]);
  
  const transforms = [y1, y2, y3, y4, y5];
  
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.6, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section ref={ref} className="h-[100svh] w-full relative bg-[#050505] flex items-center justify-center overflow-hidden">
      
      {/* INCREDIBLE BACKGROUND: Fluid Neon plasma fills the "empty" gray boxes */}
      <div className="absolute inset-0 animate-fluid-bg opacity-30 blur-[40px] mix-blend-screen pointer-events-none"></div>

      <div className="absolute inset-0 flex w-full h-full z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 h-full overflow-hidden relative border-r border-[#00f0ff]/20 last:border-0 hover:bg-white/5 transition-colors">
            {/* The sliding image acts as a laser scanner */}
            <motion.div style={{ y: transforms[i] }} className="absolute inset-0 w-full h-full will-change-transform">
               {/* Laser glowing edge at the top of the slice */}
               <div className="absolute top-0 left-0 w-full h-1 bg-[#00f0ff] shadow-[0_0_40px_10px_rgba(0,240,255,1)] z-30"></div>
               <img 
                 src={src} 
                 className="absolute top-0 h-full max-w-none object-cover saturate-[1.2]" 
                 style={{ width: '500%', left: `-${i * 100}%` }} 
                 alt="Gallery Slice" 
               />
            </motion.div>
          </div>
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent pointer-events-none mix-blend-multiply"></div>
      </div>

      <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-none">
         <h3 className="text-6xl md:text-[8vw] font-black mb-2 uppercase leading-[0.8] drop-shadow-[0_0_40px_rgba(0,240,255,1)] text-[#00f0ff] tracking-tighter">
           {title} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-white drop-shadow-none">{highlight}</span>
         </h3>
         <p className="text-xl md:text-3xl text-white font-black uppercase tracking-[0.3em] drop-shadow-[0_10px_20px_black] mt-6">
           {subtitle}
         </p>
      </motion.div>
    </section>
  );
};

function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const legendRef = useRef(null);

  // Hero Parallax
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const faqs = [
    { question: "Puis-je commander en ligne ?", answer: "Pour le moment, nous vous invitons à venir directement en boutique pour découvrir nos produits en exclusivité." },
    { question: "Quels sont les produits disponibles ?", answer: "Nous proposons une large sélection incluant des puffs, des parfums haut de gamme et des vêtements stylisés." },
    { question: "La boutique est-elle ouverte les jours fériés ?", answer: "Les horaires peuvent varier les jours fériés. N'hésitez pas à nous appeler avant votre visite." }
  ];

  const hours = [
    { day: "Lundi", time: "10:30–20:00" },
    { day: "Mardi", time: "10:30–20:00" },
    { day: "Mercredi", time: "10:30–20:00" },
    { day: "Jeudi", time: "10:30–20:00" },
    { day: "Vendredi", time: "10:30–20:00" },
    { day: "Samedi", time: "10:30–20:30" },
    { day: "Dimanche", time: "13:30–18:30" }
  ];

  return (
    <div ref={containerRef} className="bg-[#0c0c0c] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#ff00ff] selection:text-black">
      
      <EntryLoader />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] px-4 py-4 md:px-8 md:py-6">
        <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="font-black text-2xl tracking-tighter text-[#00f0ff] rotate-[-2deg]">MEGASHOP</div>
          <div className="hidden md:flex gap-8 font-black text-sm tracking-wider uppercase text-white/70">
            <a href="#legend" className="hover:text-[#ff00ff] transition-colors">Notre concept</a>
            <a href="#infos" className="hover:text-[#00f0ff] transition-colors">Informations</a>
          </div>
          <button className="bg-[#ff00ff] text-white px-6 py-2.5 rounded-full font-extrabold text-sm uppercase tracking-wide hover:scale-105 hover:bg-[#00f0ff] hover:text-black transition-all flex items-center gap-2">
            <ShoppingBag size={18} /> Acheter
          </button>
        </div>
      </nav>

      {/* Floating Socials */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[60] flex-col gap-4">
        <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-[#ff00ff] transition-all hover:scale-125 hover:rotate-12 text-white">
          <Camera size={20} />
        </a>
        <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-[#00f0ff] transition-all hover:scale-125 hover:-rotate-12 text-white hover:text-black">
          <Globe size={20} />
        </a>
      </div>

      {/* Extreme Hero Section with Animated BG & Spline */}
      <section ref={heroRef} className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden clip-slanted pb-12 pt-24 md:pt-0 bg-[#000000]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#ff00ff]/10 via-[#000000] to-[#00f0ff]/10 animate-fluid-bg z-0" />
          <FloatingParticles />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/90 z-[20] pointer-events-none"></div>
        </motion.div>

        {/* UFO Spline - Adjusted tightly and lowered */}
        <div className="absolute top-[2%] md:top-[15%] z-[60] w-full h-[25vh] md:h-[40vh] pointer-events-none scale-110 md:scale-100 flex items-center justify-center">
             <iframe 
                src="https://my.spline.design/wobblingufo-aVOXKJbUvBO9RGJWe7CDrMWQ/" 
                frameBorder="0" 
                className="w-[150vw] md:w-full h-full mix-blend-screen"
                title="Spline UFO"
              ></iframe>
        </div>

        {/* Small floating shark video on the side to fit galactical theme better */}
        <div className="absolute top-[12%] md:top-[30%] right-[-10%] md:right-[10%] w-[45vw] md:w-[35vw] z-[60] pointer-events-none transition-all duration-1000 hover:scale-110">
           <video src="/shark_video.mp4" autoPlay muted loop playsInline className="w-full h-auto object-contain contrast-[1.8] brightness-90" style={{ WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)', maskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}></video>
        </div>

        {/* Title layer: behind UFO but above background */}
        <div className="relative z-[50] w-full flex flex-col items-center justify-center text-center px-4 max-w-6xl pointer-events-none mt-[2rem] md:mt-0">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, type: "spring", bounce: 0.4 }} className="overflow-visible flex items-center justify-center w-full">
            <h1 className="text-[15vw] md:text-[11vw] font-black leading-[0.85] tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,0,255,0.6)] text-[#ff00ff] relative">
              VIENS<br />SHOPPER
            </h1>
          </motion.div>
        </div>

        {/* Single Puff Image positioned to the left of the title */}
        <div className="absolute z-[40] w-[35vw] md:w-[22vw] pointer-events-none flex items-center justify-center top-[30%] md:top-[30%] left-[-5%] md:left-[12%] rotate-[-10deg] transition-all duration-1000 hover:rotate-0 hover:-translate-y-4">
           <img 
              src="/single_puff.png" 
              className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-transform duration-1000 ease-in-out hover:scale-110"
              alt="Single Blue Puff"
           />
        </div>

        {/* Category Buttons explicitly on top (z-[50]) */}
        <div className="relative z-[50] flex flex-col items-center w-full px-2 mt-4 md:mt-12 pointer-events-auto shrink-0 mb-6 md:mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }} 
            className="flex flex-row flex-wrap md:flex-nowrap gap-3 md:gap-10 items-center justify-center w-full max-w-5xl"
          >
            <Link to="/category/parfums" className="w-[47%] md:w-auto text-center group bg-[#ff00ff] text-white px-2 py-4 md:px-8 md:py-6 rounded-[2rem] md:rounded-[3rem] font-black text-base md:text-3xl uppercase tracking-tighter hover:scale-[1.10] hover:rotate-2 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,255,0.5)] hover:shadow-[0_0_60px_rgba(255,0,255,0.8)]">
              PARFUMS
            </Link>
            <Link to="/category/puffs" className="w-[47%] md:w-auto text-center group bg-[#00f0ff] text-black px-2 py-4 md:px-8 md:py-6 rounded-[2rem] md:rounded-[3rem] font-black text-base md:text-3xl uppercase tracking-tighter hover:scale-[1.10] hover:-rotate-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_60px_rgba(0,240,255,0.8)]">
              PUFFS
            </Link>
            <Link to="/category/tshirts" className="w-[97%] md:w-auto text-center group bg-[#0c0c0c]/80 backdrop-blur-sm border-2 md:border-4 border-[#ff00ff] text-[#ff00ff] px-2 py-4 md:px-8 md:py-6 rounded-[2rem] md:rounded-[3rem] font-black text-base md:text-3xl uppercase tracking-tighter hover:scale-[1.10] md:hover:bg-[#ff00ff] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
              T-SHIRTS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Original First Marquee */}
      <div className="-mt-2 md:-mt-6">
         <MarqueeBanner text="QUALITÉ PREMIUM GALACTIQUE - MEGA SHOP" />
      </div>

      {/* Sliced Gallery Reveal (Effet 4: Le Rideau) with inter-marquees */}
      <div id="legend" className="relative z-30 w-full flex flex-col bg-[#0c0c0c]">
         <SlicedRevealSection 
           src="/casa_de_papel_megashop.png" 
           title="TOP" 
           highlight="PUFFS" 
           subtitle="Le braquage de la vape" 
         />
         
         <div className="-my-12 z-40">
           <MarqueeBanner text="TIRAGE ÉLECTRIQUE - NOUVELLES SAVEURS" color="bg-[#00f0ff]" textColor="text-black" rotation="rotate-[3deg]" speed={15} />
         </div>

         <SlicedRevealSection 
           src="/parfum_dubai_luxury.png" 
           title="NOS" 
           highlight="PARFUMS" 
           subtitle="Fragrances Dubaï" 
         />

         <div className="-my-12 z-40">
           <MarqueeBanner text="COLLECTION NÉON LIMITÉE - VÊTEMENTS" rotation="rotate-[-3deg]" speed={10} />
         </div>

         <SlicedRevealSection 
           src="/fashion_clothes_paris.png" 
           title="COLLECTION" 
           highlight="PARIS" 
           subtitle="La ville de la Mode" 
         />
      </div>

      {/* Store Information & Elegant FAQ Section */}
      <section id="infos" className="py-16 md:py-32 px-4 md:px-12 relative z-40 bg-[#050505] pb-32 md:pb-40 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_80px_rgba(255,0,255,0.15)] border-t border-[#ff00ff]/20 -mt-8 overflow-hidden">
        {/* Subtle top light bleed */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#00f0ff]/20 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10 pt-4 md:pt-0">
          
          {/* Left Column: Info & Map */}
          <div className="flex flex-col gap-6 md:gap-8 origin-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter mix-blend-screen mb-2 md:mb-6">
              MEGA<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00f0ff]">SHOP</span>
            </h2>

            {/* Mega Shop Elegant Card */}
            <div className="glass-card rounded-[30px] md:rounded-[40px] p-6 md:p-12 relative overflow-hidden group hover:border-[#00f0ff] transition-all duration-500 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff] to-[#00f0ff] opacity-10 group-hover:opacity-20 transition-opacity z-0"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 text-white">Mega Shop</h3>
                  <p className="text-[#00f0ff] uppercase tracking-widest font-bold mb-6 md:mb-8 text-sm md:text-base">Boutique de cigarettes électroniques</p>
                  
                  <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#ff00ff] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold md:text-lg text-white">58 Pl. Jacquemart</p>
                      <p className="text-white/60 text-sm md:text-base">26100 Romans-sur-Isère</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#00f0ff] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold md:text-lg text-white">07 44 25 32 15</p>
                      <p className="text-white/60 text-sm md:text-base">Contactez-nous directement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Star className="text-[#ff00ff] flex-shrink-0 mt-1" fill="currentColor" size={20} />
                    <div>
                      <p className="font-bold md:text-lg text-white">5,065 Avis Clients</p>
                      <p className="text-white/60 text-sm md:text-base">Excellence confirmée</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horaires d'ouverture - Elegant Design Revert */}
          <div className="glass-card rounded-[30px] md:rounded-[40px] p-6 md:p-12 relative overflow-hidden group hover:border-[#ff00ff] transition-all duration-500 shadow-xl">
            <div className={`absolute inset-0 bg-gradient-to-br from-[#00f0ff] to-[#ff00ff] opacity-5 group-hover:opacity-15 transition-opacity z-0`}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <Clock className="text-[#ff00ff]" size={28} />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Horaires</h3>
              </div>
              
              <ul className="space-y-3 md:space-y-4">
                {hours.map((h, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium text-white/80">{h.day}</span>
                    <span className="font-black text-[#00f0ff]">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-widest mt-6 bg-black/40 px-3 py-2 rounded-lg text-center">Les horaires peuvent être modifiés les jours fériés.</p>
            </div>
          </div>
          
          {/* FAQ Full Width */}
          <div className="md:col-span-2 mt-4 md:mt-8">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center mb-8 md:mb-12 text-[#ff00ff] drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]">Questions Fréquentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl hover:bg-white/10 hover:border-[#00f0ff] transition-colors border border-transparent">
                  <h4 className="text-lg md:text-xl font-bold uppercase mb-3 md:mb-4 text-[#00f0ff]">{faq.question}</h4>
                  <p className="text-white/70 font-medium leading-relaxed text-sm md:text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] pt-16 pb-12 px-4 md:px-8 border-t border-[#ff00ff]/20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6 md:gap-10 mb-10 md:mb-20">
          <h2 className="text-5xl md:text-9xl font-black text-[#00f0ff] tracking-tighter">MEGASHOP</h2>
          <p className="text-lg md:text-2xl font-black text-white/50 max-w-2xl uppercase tracking-wide">
             L'expérience premium à Romans-sur-Isère. 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
