import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { CAT } from "../data";
import { formatPrice } from "../lib/utils";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, currency } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return CAT.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.coll.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.sil.toLowerCase().includes(q) ||
        p.cfam.toLowerCase().includes(q) ||
        p.emb.toLowerCase().includes(q) ||
        p.primary.some(occ => occ.replace('_', ' ').toLowerCase().includes(q)) ||
        p.secondary.some(occ => occ.replace('_', ' ').toLowerCase().includes(q)) ||
        p.clrs.some(c => c.n.toLowerCase().includes(q)) ||
        p.desc.toLowerCase().includes(q) ||
        (q.includes('dress') && p.type === 'dress') ||
        (q.includes('gown') && p.type === 'gown') ||
        (q.includes('wedding') && (p.primary.includes('wedding_guest') || p.secondary.includes('wedding_guest'))) ||
        (q.includes('resort') && (p.primary.includes('resort_holiday') || p.secondary.includes('resort_holiday')))
      );
    });
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-ivory/95 backdrop-blur-sm flex flex-col items-center">
      <div className="w-full relative px-6 md:px-10 py-6 border-b border-stone bg-ivory">
        <button 
          onClick={() => setSearchOpen(false)}
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-mid hover:text-ink text-2xl px-4 py-2"
        >
          ✕
        </button>
        <div className="max-w-[800px] mx-auto w-full relative">
           <input
             ref={inputRef}
             type="text"
             value={query}
             onChange={e => setQuery(e.target.value)}
             placeholder="Search pieces, occasions, collections..."
             className="w-full bg-transparent border-0 border-b border-stone pb-3 text-2xl font-serif text-ink placeholder:text-mid/50 focus:border-ink focus:ring-0 outline-none transition-colors"
           />
        </div>
      </div>

      <div className="flex-1 w-full overflow-y-auto w-full">
        <div className="max-w-[800px] mx-auto w-full py-12 px-6 md:px-10 pb-32">
          {query.trim() !== "" && results.length === 0 && (
            <div className="text-center text-charcoal font-serif text-xl py-20 mt-10">
              No exact match found. Try "evening gown," "embroidered dress," or "resort edit."
            </div>
          )}
          
          {query.trim() !== "" && (
             <div className="mb-8 flex flex-wrap gap-2">
               {['wedding', 'gown', 'cocktail', 'floral', 'mini', 'resort'].map(sugg => {
                 if (!sugg.startsWith(query.toLowerCase()) && !query.toLowerCase().includes(sugg)) return null;
                 return (
                   <button 
                     key={sugg} 
                     onClick={() => setQuery(sugg)}
                     className="px-4 py-2 border border-stone bg-white text-[11px] uppercase tracking-widest text-mid hover:text-ink hover:border-ink transition-colors"
                   >
                     {sugg} edit
                   </button>
                 );
               })}
             </div>
          )}

          {query.trim() === "" && (
             <div className="mb-8 flex flex-col gap-4">
               <div className="text-[10px] uppercase tracking-widest text-mid mb-2">Suggested Searches</div>
               <div className="flex flex-wrap gap-2">
                 {['Wedding Guest Edit', 'Evening Gown', 'Cocktail Party', 'Resort Collection', 'Embroidered Dresses', 'Pastel Dresses'].map(sugg => (
                   <button 
                     key={sugg} 
                     onClick={() => setQuery(sugg)}
                     className="px-4 py-2 border border-stone bg-white text-[11px] uppercase tracking-widest text-mid hover:text-ink hover:border-ink transition-colors"
                   >
                     {sugg}
                   </button>
                 ))}
               </div>
             </div>
          )}
          
          {results.length > 0 && (
            <div className="space-y-6">
              {results.map(product => (
                <div 
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setSearchOpen(false);
                  }}
                  className="flex gap-6 p-4 bg-white border border-stone hover:border-gold transition-colors cursor-pointer group"
                >
                  <div className="w-24 aspect-[3/4] bg-cream shrink-0 border border-stone/50 p-1">
                    <img src={product.i1} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-gold mb-1">{product.coll} Collection</div>
                    <h3 className="text-xl font-serif text-ink mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
                    <div className="text-[11px] text-mid capitalize mb-3">{product.PrimaryColor} · {product.emb}</div>
                    <div className="text-charcoal font-serif">{formatPrice(product.price, currency)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
