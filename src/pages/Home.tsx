import { Link, useNavigate } from "react-router-dom";
import { OCC, CAT } from "../data";
import { ProductCard } from "../components/ProductCard";

export default function Home() {
  const navigate = useNavigate();
  const topSellers = CAT.filter(p => p.coll.includes('Bestseller')).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden bg-ink">
        <img 
          src="https://belafuori.com/cdn/shop/files/LF617GKG_MODEL_02.png?v=1759607005" 
          alt="Là Fuori Luxury" 
          className="absolute inset-0 w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-[10s] ease-out"
        />
        <div className="relative z-10 p-10 max-w-[800px]">
          <h1 className="text-[clamp(50px,8vw,100px)] tracking-[0.25em] font-serif mb-4 font-light">
            LÀ FUORI
          </h1>
          <p className="text-[13px] tracking-widest font-serif italic mb-10 text-white/80">
            Handcrafted luxury for the moments that matter.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate('/shop')} className="inline-flex items-center justify-center px-8 py-3 bg-white text-[10px] uppercase tracking-widest text-ink hover:bg-white/90 transition-colors">
              New Arrivals
            </button>
            <button onClick={() => navigate('/edit')} className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-white text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-ink transition-colors">
              The Occasion Edit
            </button>
          </div>
        </div>
      </section>

      {/* The Occasion Edit - Discovery */}
      <section className="py-24 px-10 max-w-[1600px] mx-auto bg-ink text-white" id="occasions">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-widest uppercase text-gold mb-4">Guided Discovery</div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-serif italic mb-4">The Occasion Edit</h2>
          <p className="text-[12px] text-white/70 max-w-[600px] mx-auto leading-relaxed">
            Select an occasion to discover pieces curated around silhouette, embellishment, colour, formality, and setting.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-stone">
          {OCC.map((o) => (
             <div key={o.key} className="relative h-[450px] cursor-pointer overflow-hidden bg-ink group" onClick={() => navigate(`/edit?occ=${o.key}`)}>
               <img src={o.img} alt={o.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-[1s]" />
               <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent flex flex-col justify-end p-10 text-white">
                 <h3 className="text-3xl font-serif italic mb-2">{o.name}</h3>
                 <p className="text-xs text-white/70 mb-6 max-w-[90%] transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-serif">
                   {o.detail}
                 </p>
                 <div className="text-[10px] tracking-widest uppercase text-gold flex items-center gap-2 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                   Discover Styles →
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-24 px-10 max-w-[1600px] mx-auto bg-ivory">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-widest uppercase text-mid mb-4">Curated Selection</div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-serif italic mb-4 text-ink">Bestsellers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map(p => (
             <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Story Brand */}
      <section className="bg-cream py-24 px-10 border-t border-stone">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="pr-0 md:pr-10">
             <img src="https://belafuori.com/cdn/shop/files/LFR144WFE_MODEL_1.jpg?v=1772882913&width=800" alt="Artisan Craft" className="w-full h-auto border border-stone-200" />
          </div>
          <div>
             <div className="text-[10px] tracking-widest uppercase text-gold mb-4">The Brand Story</div>
             <h2 className="text-4xl font-serif italic mb-6 text-ink">Conscious luxury for the modern global consumer.</h2>
             <p className="text-[13px] text-charcoal leading-relaxed mb-8 font-serif">
               Là Fuori celebrates handcrafted garments and artisan-led techniques. Our algorithm is built on the philosophy of a personal stylist—learning your occasion to recommend silhouettes that empower you.
             </p>
             <div className="grid grid-cols-2 gap-8 mt-10 p-6 border border-stone bg-white">
               <div>
                 <h4 className="text-11px uppercase tracking-widest mb-2 font-bold text-ink">Hand Embroidery</h4>
                 <p className="text-[11px] text-mid m-0 italic font-serif leading-relaxed">Up to 80 hours of artisan handcrafts per garment.</p>
               </div>
               <div>
                 <h4 className="text-[11px] uppercase tracking-widest mb-2 font-bold text-ink">Made-to-Order</h4>
                 <p className="text-[11px] text-mid m-0 italic font-serif leading-relaxed">Built intentionally for you, eliminating overproduction.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
