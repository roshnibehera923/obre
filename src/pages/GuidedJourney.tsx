import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAT, Occasion, OCC, scoreOccasion } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';

export default function GuidedJourney() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    occasion: [],
    timeOfDay: [],
    location: [],
    mood: [],
    budget: [],
    colour: [],
    silhouette: []
  });

  const steps = [
    {
      id: 'occasion',
      title: 'What is the Occasion?',
      options: ['Wedding Guest', 'Evening Gala', 'Cocktail Party', 'Festive Celebration', 'Resort Holiday', 'Corporate Event']
    },
    {
      id: 'timeOfDay',
      title: 'Time of Day',
      options: ['Day', 'Evening', 'Night']
    },
    {
      id: 'location',
      title: 'Location / Setting',
      options: ['Indoor', 'Outdoor', 'Beach', 'Destination', 'City']
    },
    {
      id: 'mood',
      title: 'Desired Mood',
      options: ['Minimal', 'Romantic', 'Bold', 'Dramatic', 'Elegant', 'Playful']
    },
    {
      id: 'budget',
      title: 'Investment Preference',
      options: ['Under $1,000', '$1,000–$2,000', '$2,000+']
    },
    {
      id: 'colour',
      title: 'Colour Preference',
      options: ['Pastel', 'Jewel Tone', 'Neutral', 'Metallic', 'Vibrant', 'Noir']
    },
    {
      id: 'silhouette',
      title: 'Silhouette Preference',
      options: ['Mini', 'Midi', 'Floor-Length', 'Gown', 'A-Line', 'Body-Skimming', 'Flowing']
    }
  ];

  const handleSelect = (val: string) => {
    const currentStep = steps[step];
    setAnswers(prev => {
      const currentSelections = prev[currentStep.id];
      if (currentSelections.includes(val)) {
        return { ...prev, [currentStep.id]: currentSelections.filter(item => item !== val) };
      }
      if (currentSelections.length >= 2) {
        return { ...prev, [currentStep.id]: [currentSelections[1], val] };
      }
      return { ...prev, [currentStep.id]: [...currentSelections, val] };
    });
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateBudgetScore = (price: number, budgetRange: string) => {
    if (budgetRange === 'Under $1,000') return price < 1000 ? 15 : -10;
    if (budgetRange === '$1,000–$2,000') return (price >= 1000 && price <= 2000) ? 15 : -10;
    if (budgetRange === '$2,000+') return price > 2000 ? 15 : -10;
    return 0;
  };

  const getResults = () => {
    let occKeys = answers.occasion.map(occ => occ.toLowerCase().replace(' ', '_'));
    occKeys = occKeys.map(k => {
      if (k === 'resort_holiday') return 'resort';
      if (k === 'festive_celebration') return 'festive';
      if (k === 'corporate_event') return 'corporate';
      return k;
    });
    
    // Compute specific matches
    let scored = CAT.map(p => {
      // Base score from generic occasion engine
      let s = 0;
      occKeys.forEach(occKey => {
         s += scoreOccasion(p, occKey);
      });
      
      // Time of Day
      answers.timeOfDay.forEach(tod => {
         if (p.contexts.includes(tod)) s += 10;
      });
      
      // Location
      answers.location.forEach(loc => {
         if (loc === 'Beach' && p.contexts.includes('Beach')) s += 15;
         else if (loc === 'Destination' && p.contexts.includes('Destination')) s += 10;
         else if (['Indoor', 'Outdoor', 'Formal Venue', 'Resort'].includes(loc)) {
            if (p.contexts.includes(loc)) s += 10;
         }
      });

      // Mood
      answers.mood.forEach(m => {
         if (p.contexts.includes(m)) s += 15;
         // Special logic for diverse mood maps
         if (m === 'Bold' && (p.cfam === 'vibrant' || p.emb === 'print')) s += 10;
      });

      // Budget
      answers.budget.forEach(b => {
         s += calculateBudgetScore(p.price, b);
      });

      return { p, s };
    }).filter(x => x.s > 20).sort((a, b) => b.s - a.s);

    const selected = [];
    
    // 1. Safe Option (neutral color OR minimal/none embellishment)
    const safe = scored.find(x => x.p.cfam === 'neutral' || x.p.eint === 'none' || x.p.eint === 'light');
    if (safe) {
      selected.push({ ...safe, type: "Best Match" });
      scored = scored.filter(x => x.p.id !== safe.p.id);
    }

    // 2. Statement Option (vibrant/jewel/metallic OR heavy/all-over embellishment)
    const statement = scored.find(x => ['vibrant', 'jewel', 'metallic'].includes(x.p.cfam) || ['heavy', 'all-over'].includes(x.p.eint) || x.p.contexts.includes('Statement') || x.p.contexts.includes('Bold'));
    if (statement) {
      selected.push({ ...statement, type: "Strong Match" });
      scored = scored.filter(x => x.p.id !== statement.p.id);
    }

    // 3. Softer / Romantic Option (pastel color OR Romantic context)
    const romantic = scored.find(x => x.p.cfam === 'pastel' || x.p.contexts.includes('Romantic') || x.p.emb.toLowerCase().includes('lace') || x.p.emb.toLowerCase().includes('ruffle'));
    if (romantic) {
      selected.push({ ...romantic, type: "Strong Match" });
      scored = scored.filter(x => x.p.id !== romantic.p.id);
    }

    // 4. Alternative Silhouette (different sil than the safe option, or just next best)
    const safeSil = safe ? safe.p.sil : null;
    const alternative = scored.find(x => x.p.sil !== safeSil && !['dress', 'gown'].includes(x.p.type)) || scored[0];
    if (alternative) {
      selected.push({ ...alternative, type: "Alternative Pick" });
      scored = scored.filter(x => x.p.id !== alternative.p.id);
    }

    // Fill remaining if needed (up to 4)
    while (selected.length < 4 && scored.length > 0) {
      selected.push({ ...scored[0], type: "Alternative Pick" });
      scored.shift();
    }

    return selected.slice(0, 4); // Max 4 results
  };

  const generateExplainability = (item: any) => {
    return `Recommended for ${answers.occasion[0] || 'your event'} styling because of its ${item.p.cfam} colour palette, elegant ${item.p.sil} silhouette, and ${item.p.eint} surface detailing.`;
  };

  const [savedEditsOpen, setSavedEditsOpen] = useState(false);

  const saveEdit = () => {
    const saved = JSON.parse(localStorage.getItem('saved_edits') || '[]');
    const summaryString = Object.values(answers).flat().filter(Boolean).join(' · ');
    saved.push({ id: Date.now(), summary: summaryString, answers });
    localStorage.setItem('saved_edits', JSON.stringify(saved));
    alert('Edit saved successfully.');
  };

  if (step >= steps.length) {
    const finalResults = getResults();
    const summaryString = Object.values(answers).flat().filter(Boolean).join(' · ');
    
    return (
      <div className="bg-ivory min-h-[80vh] py-20 px-10 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif italic text-ink mb-4">Curated For You</h2>
             <div className="inline-block border border-stone bg-white px-6 py-3 mt-4">
               <div className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Your Curated Edit</div>
               <div className="text-[12px] font-serif text-charcoal">{summaryString}</div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {finalResults.map((item, idx) => (
              <div key={item.p.id} className="flex flex-col h-full bg-white border border-stone p-4 group">
                <div className="flex-1">
                  <ProductCard product={item.p} matchScore={Math.min(item.s, 98)} badgeLabel={item.type} />
                </div>
                <div className="mt-4 pt-4 border-t border-stone bg-cream p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">Why This Works</div>
                  <p className="text-[12px] font-serif text-charcoal leading-relaxed italic">
                    {generateExplainability(item)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-6 mt-16 pt-16 border-t border-stone">
            <button onClick={() => setStep(0)} className="px-8 py-3 bg-white text-ink text-[10px] uppercase tracking-widest hover:bg-stone transition-colors border border-stone">
              Refine Your Edit
            </button>
            <button onClick={saveEdit} className="px-8 py-3 bg-ink text-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-ink transition-colors border border-ink">
              Save This Edit
            </button>
            <button onClick={() => setSavedEditsOpen(true)} className="text-[10px] uppercase tracking-widest text-mid hover:text-ink underline underline-offset-4">
              View Saved Edits
            </button>
          </div>
        </div>

        {/* Saved Edits Modal */}
        {savedEditsOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-[600px] w-full p-8 border border-stone max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone">
                <h3 className="text-2xl font-serif text-ink">Saved Edits</h3>
                <button onClick={() => setSavedEditsOpen(false)} className="text-2xl text-mid hover:text-ink">&times;</button>
              </div>
              
              {(() => {
                const edits = JSON.parse(localStorage.getItem('saved_edits') || '[]');
                if (edits.length === 0) return <div className="text-mid italic font-serif">No saved edits yet.</div>;
                return (
                  <div className="space-y-4">
                    {edits.map((edit: any) => (
                      <div key={edit.id} className="border border-stone p-4 flex justify-between items-center bg-cream">
                        <div className="flex-1 pr-4">
                          <div className="text-[11px] font-serif text-charcoal">{edit.summary}</div>
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => {
                              setAnswers(edit.answers);
                              setStep(steps.length);
                              setSavedEditsOpen(false);
                            }}
                            className="text-[10px] uppercase tracking-widest text-ink hover:text-gold transition-colors"
                          >
                            Reopen
                          </button>
                          <button 
                            onClick={() => {
                              const newEdits = edits.filter((e: any) => e.id !== edit.id);
                              localStorage.setItem('saved_edits', JSON.stringify(newEdits));
                              // Force re-render of modal
                              setSavedEditsOpen(false);
                              setTimeout(() => setSavedEditsOpen(true), 10);
                            }}
                            className="text-[10px] uppercase tracking-widest text-mid hover:text-ink transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentStep = steps[step];
  const currentSelections = answers[currentStep.id];

  return (
    <div className="bg-ivory min-h-[80vh] py-20 px-10 flex items-center justify-center">
      <div className="max-w-[700px] w-full text-center">
        <div className="text-[10px] uppercase tracking-widest text-gold mb-8">Step {step + 1} of {steps.length}</div>
        <h2 className="text-4xl font-serif text-ink mb-12">{currentStep.title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {currentStep.options.map(opt => {
            const isSelected = currentSelections.includes(opt);
            let displayOpt = opt;
            if (currentStep.id === 'budget') {
              if (opt === 'Under $1,000') {
                displayOpt = currency === 'USD' ? 'Under $1,000' : currency === 'INR' ? 'Under ₹83,000' : 'Under $1,000 / ₹83,000';
              } else if (opt === '$1,000–$2,000') {
                displayOpt = currency === 'USD' ? '$1,000–$2,000' : currency === 'INR' ? '₹83,000–₹1,66,000' : '$1,000–$2,000 / ₹83,000–₹1,66,000';
              } else if (opt === '$2,000+') {
                displayOpt = currency === 'USD' ? '$2,000+' : currency === 'INR' ? '₹1,66,000+' : '$2,000+ / ₹1,66,000+';
              }
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`border p-6 transition-all duration-300 group ${isSelected ? 'bg-ink border-ink text-white' : 'bg-white border-stone hover:border-gold text-charcoal'}`}
              >
                <div className={`font-serif text-lg ${isSelected ? 'text-white' : 'group-hover:text-gold'}`}>{displayOpt}</div>
              </button>
            );
          })}
        </div>

        {currentStep.id === 'budget' && (
          <div className="mb-12 flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-widest text-mid mb-4">Display Prices In</div>
            <div className="flex items-center gap-4 border border-stone p-1 bg-white">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-6 py-2 text-[11px] uppercase tracking-widest transition-colors ${currency === 'USD' ? 'bg-ink text-white' : 'text-mid hover:text-ink'}`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-6 py-2 text-[11px] uppercase tracking-widest transition-colors ${currency === 'INR' ? 'bg-ink text-white' : 'text-mid hover:text-ink'}`}
              >
                INR
              </button>
              <button
                onClick={() => setCurrency('BOTH')}
                className={`px-6 py-2 text-[11px] uppercase tracking-widest transition-colors ${currency === 'BOTH' ? 'bg-ink text-white' : 'text-mid hover:text-ink'}`}
              >
                BOTH
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center border-t border-stone pt-8">
           <button 
             onClick={handleBack} 
             className={`text-[10px] uppercase tracking-widest text-mid hover:text-ink transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
           >
             ← Back
           </button>
           <button 
             onClick={handleNext}
             disabled={currentSelections.length === 0}
             className="px-8 py-3 bg-ink text-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-ink border border-ink transition-colors disabled:opacity-50 disabled:pointer-events-none"
           >
             {step === steps.length - 1 ? 'See Results' : 'Next →'}
           </button>
        </div>
      </div>
    </div>
  );
}
