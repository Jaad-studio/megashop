import React, { useRef } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const bestSellers = [
  { name: 'JNR Falcon', price: '15€', image: '/products/puff_jnr_falcon_30k_generated.png', badge: 'N°1 Puffs', category: 'puffs' },
  { name: 'Yara Candy Lattafa', price: '35€', image: '/products/parfum_lattafa_yara_candy_1775592421301.png', badge: 'Top Femme', category: 'parfum-femme' },
  { name: 'Nocturne Eau de Parfum', price: '35€', image: '/parfum_homme_hero.png', badge: 'Top Homme', category: 'parfum-homme' },
  { name: 'Aerox 32k', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Populaire', category: 'puffs' },
  { name: 'Khair Paris Corner', price: '35€', image: '/products/parfum_khair_generated.png', badge: 'Tendance', category: 'parfum-femme' },
];

const BestSellersCarousel = () => {
  const scrollRef = useRef(null);
  const { addToCart } = useCart();

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-20 px-5 md:px-12 bg-gradient-to-b from-[#000000] to-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
         {/* Title area */}
         <div className="flex items-end justify-between mb-8 md:mb-12">
           <div>
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
               Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00f0ff] drop-shadow-[0_0_15px_rgba(255,0,255,0.4)]">Best-Sellers</span>
             </h2>
             <p className="text-white/40 text-sm md:text-base font-medium">Les produits les plus demandés en boutique.</p>
           </div>
           <div className="hidden md:flex gap-3">
             <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-[#ff00ff]/30 hover:shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all">
                <ChevronLeft size={24} />
             </button>
             <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-[#00f0ff]/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                <ChevronRight size={24} />
             </button>
           </div>
         </div>
         
         {/* Carousel */}
         <div 
           ref={scrollRef} 
           className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
         >
            {/* Inject minimal custom CSS to hide webkit scrollbar in this div since standard Tailwind class was used earlier */}
            <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />

            {bestSellers.map((item, i) => (
              <div key={i} className="relative min-w-[240px] md:min-w-[280px] w-[240px] md:w-[280px] snap-center shrink-0 group">
                <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden product-card-shine h-full flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.5)] border border-white/[0.05] hover:border-[#ff00ff]/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(255,0,255,0.15)]">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-[#0e0e0e] aspect-[4/5]">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md border bg-black/40 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      {item.badge}
                    </div>

                    {/* CTA Button */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                       <button
                         onClick={() => addToCart(item.flavors ? {...item, name: `${item.name} - ${item.flavors[0]}`} : item)}
                         className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 backdrop-blur-xl border transition-all duration-300 bg-white/10 hover:bg-[#00f0ff]/20 border-white/20 hover:border-[#00f0ff]/50 text-white hover:text-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                       >
                         <ShoppingCart size={16} /> Ajouter au panier
                       </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 relative z-10 flex-1 flex flex-col bg-gradient-to-b from-[#0e0e0e] to-[#0a0a0a] border-t border-white/5">
                    <h3 className="font-bold text-white/90 text-sm md:text-base leading-tight mb-1">{item.name}</h3>
                    {item.flavors && <p className="text-xs text-white/30 mb-3 line-clamp-1 truncate">{item.flavors.join(', ')}</p>}
                    <div className="mt-auto pt-2">
                       <span className="font-black text-xl text-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}

export default BestSellersCarousel;
