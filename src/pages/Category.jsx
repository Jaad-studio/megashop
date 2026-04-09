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
      title: "PARFUMS EXCLUSIFS",
      color: "text-[#d4af37]",
      bg: "bg-[#d4af37]",
      icon: "",
      desc: "Découvrez notre collection raffinée de parfums prestigieux.",
      items: [
        { name: "Prideful Volaré", price: "35€", image: "/products/parfum_volare_prideful_1775592377311.png", badge: "Élégant" },
        { name: "Kenzie Marshmallow Dream", price: "35€", image: "/products/parfum_volare_kenzie_1775592394045.png", badge: "Rêve" },
        { name: "Yara Candy Lattafa", price: "35€", image: "/products/parfum_lattafa_yara_candy_1775592421301.png", badge: "Gourmand" },
        { name: "Yara Lattafa", price: "35€", image: "/products/parfum_lattafa_yara_1775592406921.png", badge: "Iconique" },
        { name: "La Vivacité", price: "35€", image: "/products/parfum_alhambra_vivacite_1775592440080.png", badge: "Vibrant" },
        { name: "Rave Now Women", price: "35€", image: "/products/parfum_rave_now_1775592456747.png", badge: "Moderne" },
        { name: "Ameerat Al Arab", price: "35€", image: "/products/parfum_ameerat_corrected_1775591719341.png", badge: "Royal" },
        { name: "Ameerat Al Arab Prive Rose", price: "35€", image: "/products/parfum_ameerat_corrected_1775591719341.png", badge: "Floral" },
        { name: "Fakhar Lattafa", price: "35€", image: "/products/parfum_fakhar_corrected_1775591618834.png", badge: "Premium" },
        { name: "Aïsha Absolue Collection Privée", price: "35€", image: "/products/parfum_aisha_1775589064630.png", badge: "Magique" },
        { name: "Rosso Lychee", price: "35€", image: "/products/parfum_gulf_orchid_rosso_1775591638969.png", badge: "Rare" },
        { name: "Rose Bonbon", price: "35€", image: "/products/parfum_rose_bonbon_1775591686863.png", badge: "Doux" },
        { name: "Léonie Intense", price: "35€", image: "/products/parfum_leonie_1775591655798.png", badge: "Exclusif" },
        { name: "Musk Collection Cotton Candy", price: "35€", image: "/products/parfum_musk_collection_1775591701197.png", badge: "Sucré" },
        { name: "Musk Collection Blueberry", price: "35€", image: "/products/parfum_musk_collection_1775591701197.png", badge: "Frais" }
      ]
    },
    puffs: {
      title: "VAPORISATEURS PREMIUM",
      color: "text-[#00f0ff]",
      bg: "bg-[#00f0ff]",
      icon: "",
      desc: "Une sélection rigoureuse des meilleures saveurs et designs.",
      items: [
        { name: "Aerox 32k Strawberry Kiwi", price: "15€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Intense" },
        { name: "Kong Max 30k Raspberry Watermelon Ice", price: "15€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Frais" },
        { name: "Kong Max 30k Raspberry Watermelon", price: "15€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Frais" },
        { name: "Crown Bar 30k Ice Blue", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Glacé" },
        { name: "Crown Bar 30k Magic Love", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Mystique" },
        { name: "Crown Bar 30k Lemon Mint", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Rafraîchissant" },
        { name: "Crown Bar 30k Cherry Fizz", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Pétillant" },
        { name: "Crown Bar 30k Strawberry Punch", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Puissant" },
        { name: "Crown Bar 30k Mixed Berry", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Classique" },
        { name: "Razz Bar 30k+ Blueberry Sour Raspberry", price: "20€", image: "/products/puff_razzbar_blueberry_1775589118962.png", badge: "Premium" },
        { name: "Razz Bar 30k+ Strawberry Watermelon", price: "20€", image: "/products/puff_razzbar_blueberry_1775589118962.png", badge: "Intense" },
        { name: "Razz Bar 30k+ Pineapple Mango", price: "20€", image: "/products/puff_razzbar_blueberry_1775589118962.png", badge: "Tropical" },
        { name: "Razz Bar 30k+ Strawberry Banana", price: "20€", image: "/products/puff_razzbar_blueberry_1775589118962.png", badge: "Doux" },
        { name: "Razz Bar 30k+ Strawberry Ice", price: "20€", image: "/products/puff_razzbar_blueberry_1775589118962.png", badge: "Frais" },
        { name: "Razz Bar 30k+ Blueberry Ice", price: "20€", image: "/products/puff_razzbar_blueberry_1775589118962.png", badge: "Glacé" },
        { name: "Falcon JNR 30K Strawberry Ice", price: "20€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Frais" },
        { name: "Falcon JNR 30K Watermelon Mango Peach", price: "20€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Exotique" },
        { name: "Falcon JNR 30K Strawberry Watermelon Ice", price: "20€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Intense" },
        { name: "Falcon JNR 30K Blueberry Raspberry Cherry", price: "20€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Mixte" },
        { name: "Falcon JNR 30K Mixed Berries", price: "20€", image: "/products/puff_aerox_strawberry_kiwi_1775589080131.png", badge: "Classique" },
        { name: "RandM T9000 Summer Peach Ice", price: "10€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Doux" },
        { name: "RandM T9000 Cherry Ice", price: "10€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Pétillant" },
        { name: "RandM T9000 Black Dragon Ice", price: "10€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Mystique" },
        { name: "RandM T9000 Peach Mango Pineapple", price: "10€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Tropical" },
        { name: "Fumot Leopard 40K", price: "20€", image: "/products/puff_fumot_leopard_1775589133707.png", badge: "Maxi" }
      ]
    },
    tshirts: {
      title: "T-SHIRTS HAUTE-COUTURE",
      color: "text-[#00f0ff]",
      bg: "bg-[#00f0ff]",
      icon: "",
      desc: "Des tissus technologiques au design exceptionnel.",
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
