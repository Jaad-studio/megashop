import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Zap, Skull } from 'lucide-react';

function Category() {
  const { type } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const categoryData = {
    parfums: {
      title: "PARFUMS GALACTIQUES",
      color: "text-[#ff00ff]",
      bg: "bg-[#ff00ff]",
      icon: "",
      desc: "Découvrez notre collection raffinée de parfums galactiques.",
      items: [
        { name: "Sueur de Martien", price: "89€", image: "/parfum_dubai_luxury.png", badge: "Premium" },
        { name: "Void Aura", price: "99€", image: "/parfum_dubai_luxury.png", badge: "Magique" },
        { name: "Essence Alien", price: "120€", image: "/parfum_dubai_luxury.png", badge: "Exclusif" }
      ]
    },
    puffs: {
      title: "PUFFS DE L'ESPACE",
      color: "text-[#ff00ff]",
      bg: "bg-[#ff00ff]",
      icon: "",
      desc: "Une sélection rigoureuse des meilleures saveurs extraterrestres.",
      items: [
        { name: "Saveur Titanium", price: "45€", image: "/megashop_alien_puff_1775165184013.png", badge: "Intense" },
        { name: "Menthe Extraterrestre", price: "29€", image: "/megashop_alien_puff_1775165184013.png", badge: "Frais" },
        { name: "Air Pur de Jupiter", price: "120€", image: "/megashop_alien_puff_1775165184013.png", badge: "Premium" }
      ]
    },
    tshirts: {
      title: "T-SHIRTS ANTI-GRAVITÉ",
      color: "text-[#00f0ff]",
      bg: "bg-[#00f0ff]",
      icon: "",
      desc: "Des tissus technologiques qui défient les lois de l'univers.",
      items: [
        { name: "T-Shirt Qualité", price: "49€", image: "/fashion_clothes_paris.png", badge: "Classique" },
        { name: "Coton Stellaire", price: "59€", image: "/fashion_clothes_paris.png", badge: "Doux" },
        { name: "T-Shirt Magnétique", price: "80€", image: "/fashion_clothes_paris.png", badge: "Innovant" }
      ]
    }
  };

  const data = categoryData[type] || categoryData.puffs;

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Navbar */}
      <nav className="p-8 pb-4 flex justify-between items-center border-b border-white/10 bg-[#0c0c0c] sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-4 text-white hover:text-yellow-400 font-bold uppercase transition-colors">
          <ArrowLeft /> Retour à la base
        </Link>
        <div className={`font-black tracking-tighter text-3xl uppercase ${data.color}`}>
          MEGASHOP {data.icon}
        </div>
      </nav>

      {/* Header */}
      <header className={`py-40 text-center relative overflow-hidden clip-slanted`}>
        <div className={`absolute inset-0 ${data.bg} opacity-10`} />
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-6xl md:text-9xl font-black uppercase tracking-tighter drop-shadow-2xl ${data.color}`}
        >
          {data.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-2xl font-black max-w-2xl mx-auto"
        >
          {data.desc}
        </motion.p>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.items.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -20, rotate: i % 2 === 0 ? 3 : -3 }}
            className={`glass-card rounded-[40px] p-6 relative overflow-hidden group border-2 border-transparent hover:border-solid transition-all duration-300 shadow-xl`}
            style={{ '--tw-border-opacity': 1, borderColor: 'var(--tw-border-opacity) ? transparent : transparent' }}
          >
            {/* Custom hover border via style or class */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${data.bg}`}></div>
            
            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden mb-6 bg-black">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
              <div className={`absolute top-4 left-4 ${data.bg} text-black font-black uppercase tracking-widest text-xs px-4 py-2 rounded-full rotate-[-10deg]`}>
                {item.badge}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-2 truncate">{item.name}</h3>
              <div className={`text-4xl font-black mb-6 ${data.color}`}>{item.price}</div>
              
              <button className={`w-full ${data.bg} text-black uppercase font-black text-xl py-4 rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform`}>
                <ShoppingCart /> Voler
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default Category;
