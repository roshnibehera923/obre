import { useState, useMemo } from "react";
import { CAT, OCC } from "../data";
import { ProductCard } from "../components/ProductCard";
import { cn } from "../lib/utils";
import { useStore } from "../store";

type SortOption = "recommended" | "price-asc" | "price-desc" | "newest" | "formal";

export default function Shop() {
  const { currency } = useStore();
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filters, setFilters] = useState<{
    type: string[];
    coll: string[];
    color: string[];
    emb: string[];
    len: string[];
    occ: string[];
    price: string[];
    form: string[];
  }>({
    type: [], coll: [], color: [], emb: [], len: [], occ: [], price: [], form: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      };
    });
  };

  const clearFilters = () => setFilters({ type: [], coll: [], color: [], emb: [], len: [], occ: [], price: [], form: [] });

  const activeFilterCount = Object.keys(filters).reduce((acc, key) => acc + (filters as any)[key].length, 0);

  const processedProducts = useMemo(() => {
    let result = CAT.filter(p => {
      if (filters.type.length > 0 && !filters.type.includes(p.type)) return false;
      if (filters.coll.length > 0 && !filters.coll.includes(p.coll)) return false;
      if (filters.emb.length > 0 && !filters.emb.includes(p.emb)) return false;
      if (filters.len.length > 0 && !filters.len.includes(p.len)) return false;
      if (filters.color.length > 0 && !p.clrs.some(c => filters.color.includes(c.n))) return false;
      if (filters.occ.length > 0 && !filters.occ.some(o => p.primary.includes(o) || p.secondary.includes(o))) return false;
      
      if (filters.form.length > 0) {
         const fMatch = filters.form.some(f => {
            if (f === 'Low') return p.form <= 2;
            if (f === 'Medium') return p.form === 3;
            if (f === 'High') return p.form >= 4;
            return false;
         });
         if (!fMatch) return false;
      }

      if (filters.price.length > 0) {
         const pMatch = filters.price.some(pr => {
             if (pr === 'Under $1000') return p.price < 1000;
             if (pr === '$1000 - $2000') return p.price >= 1000 && p.price <= 2000;
             if (pr === 'Over $2000') return p.price > 2000;
             return false;
         });
         if (!pMatch) return false;
      }

      return true;
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "formal":
        result.sort((a, b) => b.form - a.form); 
        break;
      case "newest":
      case "recommended":
      default:
        break;
    }

    if (sort === "newest") {
       return [...result].reverse();
    }
    
    return result;
  }, [sort, filters]);

  const uniqueOptions = useMemo(() => {
    return {
      type: Array.from(new Set(CAT.map(p => p.type))),
      coll: Array.from(new Set(CAT.map(p => p.coll))),
      emb: Array.from(new Set(CAT.map(p => p.emb))),
      len: Array.from(new Set(CAT.map(p => p.len))),
      color: Array.from(new Set(CAT.flatMap(p => p.clrs.map(c => c.n)))),
      occ: OCC.map(o => o.key),
      occNames: OCC.reduce((acc, o) => ({...acc, [o.key]: o.name}), {} as Record<string, string>),
      price: ['Under $1000', '$1000 - $2000', 'Over $2000'],
      form: ['Low', 'Medium', 'High']
    };
  }, []);

  const getSelectedFilters = () => {
     let sel: {category: keyof typeof filters, value: string, display: string}[] = [];
     Object.keys(filters).forEach(k => {
        filters[k as keyof typeof filters].forEach(v => {
           let disp = v;
           if (k === 'occ') disp = uniqueOptions.occNames[v] || v;
           sel.push({category: k as keyof typeof filters, value: v, display: disp});
        });
     });
     return sel;
  };

  const selectedChips = getSelectedFilters();

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-ivory border-b border-stone sticky top-[75px] z-30">
        <div className="max-w-[1600px] mx-auto px-10 py-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-mid mb-2">Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn("text-[11px] uppercase tracking-widest border transition-colors px-6 py-2.5", showFilters ? "bg-ink text-white border-ink" : "bg-white text-ink border-ink hover:bg-stone")}
            >
              {showFilters ? 'Hide Filters' : 'Refine Selection'}
            </button>
          </div>
          <div className="text-center md:text-left transition-all w-full md:w-auto flex-1 md:flex-none">
             <h1 className="text-3xl font-serif italic text-ink md:mx-auto">Complete Collection</h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] tracking-widest uppercase text-mid mb-2">Sorting</div>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-[11px] uppercase tracking-widest border border-stone bg-white text-ink px-4 py-2.5 outline-none hover:border-ink transition-colors cursor-pointer appearance-none min-w-[200px]"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="formal">Most Formal</option>
            </select>
          </div>
        </div>

        {selectedChips.length > 0 && !showFilters && (
          <div className="max-w-[1600px] mx-auto px-10 pb-6 pt-2 flex flex-col md:flex-row gap-4 items-center">
             <div className="text-[10px] uppercase tracking-widest text-mid font-bold shrink-0">Selected:</div>
             <div className="flex gap-2 flex-wrap flex-1">
                {selectedChips.map(f => (
                   <span key={String(f.category) + '-' + f.value} className="text-[10px] uppercase tracking-widest text-ink bg-cream border border-stone px-3 py-1 flex items-center gap-2">
                     {f.display}
                     <button onClick={() => toggleFilter(f.category, f.value)} className="hover:text-gold text-sm">&times;</button>
                   </span>
                ))}
             </div>
             <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-mid hover:text-ink underline underline-offset-4 shrink-0">Clear All</button>
          </div>
        )}

        {/* Expandable Filters Overlay */}
        {showFilters && (
          <div className="border-t border-stone bg-white p-10 shadow-lg absolute w-full left-0 origin-top transform transition-all max-h-[80vh] overflow-y-auto">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex justify-between items-end mb-8 pb-4 border-b border-stone">
                <span className="font-serif italic text-2xl text-ink">Filter Criteria</span>
                <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-mid hover:text-ink underline underline-offset-4">Reset All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8">
                {/* Category */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Category</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {uniqueOptions.type.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only" checked={filters.type.includes(opt)} onChange={() => toggleFilter('type', opt)} />
                        <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors", filters.type.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                          {filters.type.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                        <span className={cn("text-[11px] uppercase tracking-widest transition-colors", filters.type.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Occasion */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Occasion</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {uniqueOptions.occ.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only" checked={filters.occ.includes(opt)} onChange={() => toggleFilter('occ', opt)} />
                        <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors", filters.occ.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                          {filters.occ.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                        <span className={cn("text-[11px] uppercase tracking-widest transition-colors", filters.occ.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{uniqueOptions.occNames[opt]}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Collection */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Collection</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {uniqueOptions.coll.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only" checked={filters.coll.includes(opt)} onChange={() => toggleFilter('coll', opt)} />
                        <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors", filters.coll.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                          {filters.coll.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                        <span className={cn("text-[11px] uppercase tracking-widest transition-colors", filters.coll.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Price</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {uniqueOptions.price.map(opt => {
                      let displayOpt = opt;
                      if (opt === 'Under $1000') {
                        displayOpt = currency === 'USD' ? 'Under $1,000' : currency === 'INR' ? 'Under ₹83,000' : 'Under $1,000 / ₹83,000';
                      } else if (opt === '$1000 - $2000') {
                        displayOpt = currency === 'USD' ? '$1,000–$2,000' : currency === 'INR' ? '₹83,000–₹1,66,000' : '$1,000–$2,000 / ₹83,000–₹1,66,000';
                      } else if (opt === 'Over $2000') {
                        displayOpt = currency === 'USD' ? '$2,000+' : currency === 'INR' ? '₹1,66,000+' : '$2,000+ / ₹1,66,000+';
                      }
                      return (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="sr-only" checked={filters.price.includes(opt)} onChange={() => toggleFilter('price', opt)} />
                          <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors", filters.price.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                            {filters.price.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                          </div>
                          <span className={cn("text-[11px] uppercase tracking-widest transition-colors", filters.price.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{displayOpt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                {/* Length */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Length</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {uniqueOptions.len.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only" checked={filters.len.includes(opt)} onChange={() => toggleFilter('len', opt)} />
                        <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors", filters.len.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                          {filters.len.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                        <span className={cn("text-[11px] uppercase tracking-widest transition-colors", filters.len.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{opt.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Embellishment */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Embellishment</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                    {uniqueOptions.emb.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only" checked={filters.emb.includes(opt)} onChange={() => toggleFilter('emb', opt)} />
                        <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors shrink-0", filters.emb.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                          {filters.emb.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                        <span className={cn("text-[11px] uppercase tracking-widest transition-colors break-words", filters.emb.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Formality */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Formality</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {uniqueOptions.form.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="sr-only" checked={filters.form.includes(opt)} onChange={() => toggleFilter('form', opt)} />
                        <div className={cn("w-3 h-3 border flex items-center justify-center transition-colors", filters.form.includes(opt) ? "border-ink bg-ink" : "border-mid group-hover:border-ink")}>
                          {filters.form.includes(opt) && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                        <span className={cn("text-[11px] uppercase tracking-widest transition-colors", filters.form.includes(opt) ? "text-ink" : "text-mid group-hover:text-ink")}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Color */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Color Base</h4>
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto content-start">
                    {uniqueOptions.color.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => toggleFilter('color', opt)}
                        className={cn("px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-colors", filters.color.includes(opt) ? "bg-ink text-white border-ink" : "bg-white text-mid border-stone hover:border-ink hover:text-ink")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-stone flex justify-center">
                 <button onClick={() => setShowFilters(false)} className="bg-ink text-white px-10 py-3 text-[11px] uppercase tracking-widest hover:bg-white hover:text-ink border border-ink transition-colors">
                   Apply Filters ({processedProducts.length} Results)
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-10 py-16">
        {processedProducts.length === 0 ? (
          <div className="py-32 text-center text-charcoal font-serif italic text-2xl border border-stone bg-white max-w-[600px] mx-auto">
            No pieces match your exact refined criteria.
            <button onClick={clearFilters} className="block mx-auto mt-8 text-[10px] uppercase tracking-widest border border-ink text-ink font-sans not-italic px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {processedProducts.map(p => (
               <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
