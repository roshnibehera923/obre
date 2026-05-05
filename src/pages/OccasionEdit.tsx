import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { OCC, recommendForOccasion } from "../data";
import { ProductCard } from "../components/ProductCard";
import { cn } from "../lib/utils";

const CONTEXT_OPTIONS = [
  { group: "Settings", options: ["Day", "Night", "Indoor", "Outdoor", "Beach", "Destination"] },
  { group: "Mood", options: ["Minimal", "Romantic", "Bold", "Statement"] }
];

export default function OccasionEdit() {
  const [params, setParams] = useSearchParams();
  const occParam = params.get("occ");
  
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const occasion = OCC.find(o => o.key === occParam);

  const toggleContext = (ctx: string) => {
    setSelectedContexts(prev => 
      prev.includes(ctx) ? prev.filter(c => c !== ctx) : [...prev, ctx]
    );
  };

  const results = useMemo(() => {
    if (!occasion) return [];
    return recommendForOccasion(occasion.key, selectedContexts);
  }, [occasion, selectedContexts]);

  // If no occasion is selected, show full grid
  if (!occasion) {
    const savedEdits = JSON.parse(localStorage.getItem('savedEdits') || '[]');

    return (
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[320px] shrink-0 border-r border-stone p-8 flex flex-col pt-10 bg-white h-[calc(100vh-112px)] overflow-y-auto">
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-3xl italic mb-4 text-gold">Guided Discovery</h2>
              <p className="text-[12px] leading-relaxed text-mid">Select an occasion to discover pieces curated around silhouette, color, and formality.</p>
            </div>
            
            {savedEdits.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] text-mid uppercase tracking-widest block mb-4 border-b border-stone pb-2">Saved Edits</span>
                {savedEdits.map((edit: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => {
                        setParams({ occ: edit.occ });
                        setSelectedContexts(edit.contexts);
                    }}
                    className="w-full text-left flex flex-col py-3 border-b border-stone hover:border-gold transition-colors group"
                  >
                    <span className="text-[11px] uppercase tracking-widest text-ink group-hover:text-gold mb-1">{edit.name}</span>
                    <span className="text-[10px] text-mid capitalize line-clamp-1">{edit.contexts.join(' · ')}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] text-mid uppercase tracking-widest block mb-4 border-b border-stone pb-2">Available Occasions</span>
              {OCC.map(o => (
                <button 
                  key={o.key}
                  onClick={() => setParams({ occ: o.key })}
                  className="w-full text-left flex justify-between items-center py-3 border-b border-stone hover:border-gold transition-colors group"
                >
                  <span className="text-[11px] uppercase tracking-widest text-ink group-hover:text-gold transition-colors">{o.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">→</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        
        <section className="flex-1 p-10 overflow-y-auto h-[calc(100vh-112px)] bg-ivory">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h1 className="font-serif text-4xl text-ink">The Occasion Edit</h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-mid">Choose your event to begin</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OCC.map(o => (
              <div 
                key={o.key}
                onClick={() => setParams({ occ: o.key })}
                className="group relative cursor-pointer aspect-[4/5] bg-stone overflow-hidden border border-stone flex flex-col"
              >
                <img src={o.img} alt={o.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="relative mt-auto p-8 z-10">
                  <h3 className="text-3xl font-serif italic text-white mb-2">{o.name}</h3>
                  <p className="text-[11px] text-white/80 leading-relaxed max-w-[90%] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {o.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Active Occasion View
  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-[320px] shrink-0 border-r border-stone p-8 flex flex-col bg-white h-[calc(100vh-112px)] overflow-y-auto sticky top-[75px]">
        <div className="space-y-8 flex-1">
          <div>
            <button onClick={() => setParams({})} className="text-[10px] uppercase tracking-widest text-mid hover:text-ink mb-6 inline-flex items-center gap-2">
              <span>←</span> Change Occasion
            </button>
            <h2 className="font-serif text-2xl italic mb-4 text-gold">Guided Discovery</h2>
            <p className="text-[12px] leading-relaxed text-mid">Refine your recommendations by layering event contexts.</p>
          </div>
          
          <div className="space-y-4">
            <div className="group">
              <span className="text-[10px] text-mid uppercase tracking-tighter">Step 01</span>
              <div className="flex justify-between items-center py-2 border-b border-stone">
                <span className="text-[12px] uppercase tracking-widest text-ink">Occasion</span>
                <span className="text-xs font-serif italic text-charcoal">{occasion.name}</span>
              </div>
            </div>
            
            {CONTEXT_OPTIONS.map((group, idx) => (
              <div key={group.group} className="group">
                <span className="text-[10px] text-mid uppercase tracking-tighter">Step 0{idx + 2}</span>
                <div className="py-2 border-b border-stone">
                  <span className="text-[12px] uppercase tracking-widest text-ink block mb-3">{group.group}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleContext(opt)}
                        className={cn(
                          "px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] border transition-colors",
                          selectedContexts.includes(opt) 
                            ? "bg-ink text-white border-ink" 
                            : "bg-white text-mid border-stone hover:border-gold hover:text-gold"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cream p-6 border border-stone space-y-3 mt-8">
            <h3 className="text-[11px] uppercase tracking-[0.1em] font-bold text-ink">How This Edit Was Curated</h3>
            <p className="text-[11px] text-charcoal leading-relaxed italic font-serif">
              Our engine prioritizes silhouettes and formality tiers based on your selections, surfacing distinct options for daytime versus evening events.
            </p>
            <button 
              onClick={() => setShowHowItWorks(true)}
              className="text-[10px] uppercase underline tracking-widest text-gold hover:text-ink transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-stone">
          <p className="text-[12px] italic text-center text-charcoal font-serif leading-relaxed">
            "Handcrafted luxury for the moments that matter."
          </p>
        </div>
      </aside>

      <section className="flex-1 p-10 overflow-y-auto h-[calc(100vh-112px)] bg-ivory">
        <div className="flex justify-between items-end mb-8 border-b border-stone pb-6">
          <div className="space-y-1">
            <h1 className="font-serif text-4xl text-ink">The {occasion.name.replace(' Event', '').replace(' Vacation', '')} Edit</h1>
            <p className="text-[14px] font-serif italic text-charcoal mt-2 mb-2">
               Curated for: <span className="font-medium text-ink">{occasion.name} {selectedContexts.length > 0 ? "· " + selectedContexts.join(" · ") : ""}</span>
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-mid pt-2">{results.length} Curated Pieces</p>
          </div>
          <div className="flex gap-8 items-center">
            <button 
              onClick={() => {
                 const edits = JSON.parse(localStorage.getItem('savedEdits') || '[]');
                 edits.push({ occ: occasion.key, name: occasion.name, contexts: selectedContexts });
                 localStorage.setItem('savedEdits', JSON.stringify(edits));
                 alert("Edit saved successfully.");
              }}
              className="text-[10px] uppercase tracking-widest text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-white transition-colors"
            >
              Save This Edit
            </button>
            <div className="flex gap-4 text-[11px] uppercase tracking-widest items-center">
              <span className="text-mid">Sort by:</span>
              <span className="border-b border-ink text-ink pb-0.5">Occasion Suitability</span>
            </div>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-24">
            {results.map(({p, s}) => (
              <ProductCard key={p.id} product={p} matchScore={s} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <h3 className="font-serif text-2xl italic text-mid mb-4">No pieces distinctly matched the refined criteria.</h3>
            <p className="text-[13px] text-charcoal mb-6">Try removing some context filters to broaden the recommendations.</p>
            <button 
              onClick={() => setSelectedContexts([])}
              className="px-6 py-3 text-[10px] uppercase tracking-widest border border-ink text-ink hover:bg-ink hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Modal - How it works */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-white max-w-[600px] w-full p-10 relative border border-stone">
            <button onClick={() => setShowHowItWorks(false)} className="absolute top-6 right-6 text-2xl text-mid hover:text-ink transition-colors">×</button>
            <h3 className="font-serif text-3xl italic mb-6 text-ink">How This Edit Was Curated</h3>
            <p className="text-[14px] text-charcoal leading-[1.6] mb-8 font-serif">
              Your edit is curated by considering occasion, time, setting, silhouette, colour, embellishment intensity, formality, and budget. Pieces that match more of your preferences appear higher in the edit.
            </p>
            <div className="text-[11px] uppercase tracking-[0.15em] text-gold mb-4 border-b border-stone pb-2 font-medium">The Process</div>
            <ul className="text-[13px] text-mid space-y-4 mb-4 font-serif">
               <li><strong>1. Formality Alignment:</strong> We ensure the piece meets the structured or relaxed demands of the event setting.</li>
               <li><strong>2. Contextual Styling:</strong> Choices like 'Outdoor' or 'Day' guide our recommendations towards appropriate fabrics, colors, and embellishment levels.</li>
               <li><strong>3. Customization:</strong> We surface pieces that can be tailored to perfectly match your desired mood.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
