import { useState, useRef, useEffect } from 'react';
import { CAT, scoreOccasion } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';
import { CURRENCY_META, getBudgetLabel, type CurrencyCode } from '../lib/utils';

// ─── Visual metadata per step ──────────────────────────────────────────────

const STEP_META: Record<string, {
  subtitle: string;
  cards: Record<string, { img: string; tag: string }>;
}> = {
  occasion: {
    subtitle: 'Curated pieces tailored to your moment.',
    cards: {
      'Wedding Guest':       { img: 'https://images.unsplash.com/photo-1583846552345-bd6fbbd14da6?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Romantic occasion dressing' },
      'Evening Gala':        { img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Black-tie couture' },
      'Cocktail Party':      { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Chic nightlife glamour' },
      'Festive Celebration': { img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Jewelled festive luxury' },
      'Resort Holiday':      { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Coastal editorial ease' },
      'Corporate Event':     { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Minimal structured power' },
    },
  },
  timeOfDay: {
    subtitle: 'Let the light define your look.',
    cards: {
      'Day':     { img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Sunlit editorial ease' },
      'Evening': { img: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Golden-hour elegance' },
      'Night':   { img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Dramatic after-dark' },
    },
  },
  location: {
    subtitle: 'The setting shapes the silhouette.',
    cards: {
      'Indoor':      { img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Ballroom refinement' },
      'Outdoor':     { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Garden editorial' },
      'Beach':       { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Coastal resort luxury' },
      'Destination': { img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=800&q=80', tag: "Traveller's wardrobe" },
      'City':        { img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Urban luxury fashion' },
    },
  },
  mood: {
    subtitle: 'Define the energy of your look.',
    cards: {
      'Minimal':  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Quiet luxury' },
      'Romantic': { img: 'https://images.unsplash.com/photo-1494955870675-b0a92c78b1b7?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Soft floral poetry' },
      'Bold':     { img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Statement energy' },
      'Dramatic': { img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Cinematic presence' },
      'Elegant':  { img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Timeless refinement' },
      'Playful':  { img: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Joyful movement' },
    },
  },
  budget: {
    subtitle: 'A wardrobe investment, made beautifully.',
    cards: {
      'Under $1,000':   { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Considered luxury' },
      '$1,000–$2,000':  { img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Artisan craftsmanship' },
      '$2,000+':        { img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Couture atelier' },
    },
  },
  colour: {
    subtitle: 'Colour is your first impression.',
    cards: {
      'Pastel':     { img: 'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Soft ethereal tones' },
      'Jewel Tone': { img: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Rich chromatic depth' },
      'Neutral':    { img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Understated elegance' },
      'Metallic':   { img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Light-catching luxe' },
      'Vibrant':    { img: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Unapologetic colour' },
      'Noir':       { img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&h=800&q=80', tag: 'The power of black' },
    },
  },
  silhouette: {
    subtitle: 'Choose the structure that reflects your style.',
    cards: {
      'Mini':          { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Playful cocktail cut' },
      'Midi':          { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Modern ladylike length' },
      'Floor-Length':  { img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Sweeping drama' },
      'Gown':          { img: 'https://images.unsplash.com/photo-1583846552345-bd6fbbd14da6?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Couture grandeur' },
      'A-Line':        { img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Timeless femininity' },
      'Body-Skimming': { img: 'https://images.unsplash.com/photo-1548360828-11e47ae7b96f?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Sleek second skin' },
      'Flowing':       { img: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Draped in movement' },
    },
  },
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

// ─── Currency dropdown ─────────────────────────────────────────────────────

function CurrencyDropdown({
  currency,
  setCurrency,
}: {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = CURRENCY_META.find(c => c.code === currency) ?? CURRENCY_META[0];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 border border-[#C5A059]/40 hover:border-[#C5A059] px-5 py-3 transition-all duration-300 group"
        style={{ background: 'rgba(197,160,89,0.06)' }}
      >
        <span className="text-[#C5A059] font-bold text-[11px] tracking-[0.2em] uppercase">{active.code === 'BOTH' ? 'USD · INR' : active.code}</span>
        <span className="text-white/40 font-sans text-[10px] tracking-widest">—</span>
        <span className="text-white/60 font-sans text-[10px] tracking-widest uppercase">{active.name}</span>
        <svg
          className={`w-3 h-3 text-[#C5A059] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 8" fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 border border-[#C5A059]/20 overflow-hidden"
          style={{ background: '#131109', minWidth: '260px' }}
        >
          {CURRENCY_META.map((c, i) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className={`w-full flex items-center justify-between px-5 py-3 transition-colors duration-150 text-left
                ${currency === c.code
                  ? 'bg-[#C5A059]/15 text-[#C5A059]'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
                ${i < CURRENCY_META.length - 1 ? 'border-b border-white/5' : ''}
              `}
            >
              <span className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium">
                {c.code === 'BOTH' ? 'BOTH' : c.code}
              </span>
              <span className="font-sans text-[10px] tracking-widest uppercase opacity-70">{c.name}</span>
              {currency === c.code && (
                <span className="text-[#C5A059] text-xs ml-2">✦</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function GuidedJourney() {
  const { currency, setCurrency } = useStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    occasion: [],
    timeOfDay: [],
    location: [],
    mood: [],
    budget: [],
    colour: [],
    silhouette: [],
  });
  const [savedEditsOpen, setSavedEditsOpen] = useState(false);

  const steps = [
    { id: 'occasion',   title: 'What is the Occasion?',           options: ['Wedding Guest', 'Evening Gala', 'Cocktail Party', 'Festive Celebration', 'Resort Holiday', 'Corporate Event'] },
    { id: 'timeOfDay',  title: 'Time of Day',                     options: ['Day', 'Evening', 'Night'] },
    { id: 'location',   title: 'Location & Setting',              options: ['Indoor', 'Outdoor', 'Beach', 'Destination', 'City'] },
    { id: 'mood',       title: 'What Mood Are You Dressing For?', options: ['Minimal', 'Romantic', 'Bold', 'Dramatic', 'Elegant', 'Playful'] },
    { id: 'budget',     title: 'Investment Preference',           options: ['Under $1,000', '$1,000–$2,000', '$2,000+'] },
    { id: 'colour',     title: 'Colour Preference',               options: ['Pastel', 'Jewel Tone', 'Neutral', 'Metallic', 'Vibrant', 'Noir'] },
    { id: 'silhouette', title: 'What Silhouette Speaks to You?',  options: ['Mini', 'Midi', 'Floor-Length', 'Gown', 'A-Line', 'Body-Skimming', 'Flowing'] },
  ];

  // ── Logic (preserved exactly) ─────────────────────────────────────────

  const handleSelect = (val: string) => {
    const currentStep = steps[step];
    setAnswers(prev => {
      const cur = prev[currentStep.id];
      if (cur.includes(val)) return { ...prev, [currentStep.id]: cur.filter(i => i !== val) };
      if (cur.length >= 2)   return { ...prev, [currentStep.id]: [cur[1], val] };
      return { ...prev, [currentStep.id]: [...cur, val] };
    });
  };

  const handleNext = () => { if (step < steps.length) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const calculateBudgetScore = (price: number, budgetRange: string) => {
    if (budgetRange === 'Under $1,000')  return price < 1000  ? 15 : -10;
    if (budgetRange === '$1,000–$2,000') return (price >= 1000 && price <= 2000) ? 15 : -10;
    if (budgetRange === '$2,000+')       return price > 2000   ? 15 : -10;
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

    let scored = CAT.map(p => {
      let s = 0;
      occKeys.forEach(occKey => { s += scoreOccasion(p, occKey); });
      answers.timeOfDay.forEach(tod => { if (p.contexts.includes(tod)) s += 10; });
      answers.location.forEach(loc => {
        if (loc === 'Beach' && p.contexts.includes('Beach')) s += 15;
        else if (loc === 'Destination' && p.contexts.includes('Destination')) s += 10;
        else if (['Indoor', 'Outdoor', 'Formal Venue', 'Resort'].includes(loc)) {
          if (p.contexts.includes(loc)) s += 10;
        }
      });
      answers.mood.forEach(m => {
        if (p.contexts.includes(m)) s += 15;
        if (m === 'Bold' && (p.cfam === 'vibrant' || p.emb === 'print')) s += 10;
      });
      answers.budget.forEach(b => { s += calculateBudgetScore(p.price, b); });
      return { p, s };
    }).filter(x => x.s > 20).sort((a, b) => b.s - a.s);

    const selected: any[] = [];
    const safe = scored.find(x => x.p.cfam === 'neutral' || x.p.eint === 'none' || x.p.eint === 'light');
    if (safe) { selected.push({ ...safe, type: 'Best Match' }); scored = scored.filter(x => x.p.id !== safe.p.id); }
    const statement = scored.find(x => ['vibrant', 'jewel', 'metallic'].includes(x.p.cfam) || ['heavy', 'all-over'].includes(x.p.eint) || x.p.contexts.includes('Statement') || x.p.contexts.includes('Bold'));
    if (statement) { selected.push({ ...statement, type: 'Strong Match' }); scored = scored.filter(x => x.p.id !== statement.p.id); }
    const romantic = scored.find(x => x.p.cfam === 'pastel' || x.p.contexts.includes('Romantic') || x.p.emb.toLowerCase().includes('lace') || x.p.emb.toLowerCase().includes('ruffle'));
    if (romantic) { selected.push({ ...romantic, type: 'Strong Match' }); scored = scored.filter(x => x.p.id !== romantic.p.id); }
    const safeSil = safe ? safe.p.sil : null;
    const alternative = scored.find(x => x.p.sil !== safeSil && !['dress', 'gown'].includes(x.p.type)) || scored[0];
    if (alternative) { selected.push({ ...alternative, type: 'Alternative Pick' }); scored = scored.filter(x => x.p.id !== alternative.p.id); }
    while (selected.length < 4 && scored.length > 0) { selected.push({ ...scored[0], type: 'Alternative Pick' }); scored.shift(); }
    return selected.slice(0, 4);
  };

  const generateExplainability = (item: any) =>
    `Recommended for ${answers.occasion[0] || 'your event'} styling because of its ${item.p.cfam} colour palette, elegant ${item.p.sil} silhouette, and ${item.p.eint} surface detailing.`;

  const saveEdit = () => {
    const saved = JSON.parse(localStorage.getItem('saved_edits') || '[]');
    const summaryString = Object.values(answers).flat().filter(Boolean).join(' · ');
    saved.push({ id: Date.now(), summary: summaryString, answers });
    localStorage.setItem('saved_edits', JSON.stringify(saved));
    alert('Edit saved successfully.');
  };

  // ── Results page ──────────────────────────────────────────────────────

  if (step >= steps.length) {
    const finalResults = getResults();
    const summaryString = Object.values(answers).flat().filter(Boolean).join(' · ');

    return (
      <div className="min-h-screen" style={{ background: '#0E0C09' }}>
        {/* Results header */}
        <div className="relative border-b border-white/8 px-6 md:px-16 py-20 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(197,160,89,0.25) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#C5A059] mb-6 font-sans">
              Your Curated Edit
            </div>
            <h1 className="font-serif italic text-white text-5xl md:text-6xl mb-8">
              Curated For You
            </h1>
            <div
              className="inline-block border border-[#C5A059]/30 px-8 py-4"
              style={{ background: 'rgba(197,160,89,0.06)' }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059]/70 mb-2 font-sans">Your Selections</div>
              <div className="text-[13px] font-serif text-white/70 italic">{summaryString || 'No selections made'}</div>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="px-6 md:px-16 py-16">
          {finalResults.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif italic text-white/50 text-2xl">No exact matches found.</p>
              <p className="font-sans text-[11px] tracking-widest text-white/30 uppercase mt-4">Try broadening your selections.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {finalResults.map((item) => (
                <div key={item.p.id} className="flex flex-col" style={{ background: '#161410' }}>
                  <div className="flex-1 p-4">
                    <ProductCard product={item.p} matchScore={Math.min(item.s, 98)} badgeLabel={item.type} />
                  </div>
                  <div className="px-4 pb-5 pt-3 border-t border-white/8">
                    <div className="text-[9px] tracking-[0.25em] uppercase text-[#C5A059] mb-2 font-sans">Why This Works</div>
                    <p className="text-[11px] font-serif text-white/55 leading-relaxed italic">
                      {generateExplainability(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA bar */}
        <div className="border-t border-white/8 px-6 md:px-16 py-10 flex flex-col sm:flex-row justify-center items-center gap-5">
          <button
            onClick={() => setStep(0)}
            className="px-9 py-3 border border-white/20 text-white/60 text-[10px] tracking-[0.2em] uppercase hover:border-white/50 hover:text-white transition-all duration-300 font-sans"
          >
            Refine Your Edit
          </button>
          <button
            onClick={saveEdit}
            className="px-9 py-3 border border-[#C5A059] text-[#C5A059] text-[10px] tracking-[0.2em] uppercase hover:bg-[#C5A059] hover:text-[#0E0C09] transition-all duration-300 font-sans font-medium"
          >
            Save This Edit
          </button>
          <button
            onClick={() => setSavedEditsOpen(true)}
            className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 underline underline-offset-4 transition-colors font-sans"
          >
            View Saved Edits
          </button>
        </div>

        {/* Saved Edits Modal */}
        {savedEditsOpen && (
          <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[580px] max-h-[80vh] overflow-y-auto border border-white/10" style={{ background: '#161410' }}>
              <div className="flex justify-between items-center px-8 py-6 border-b border-white/8">
                <h3 className="text-2xl font-serif italic text-white">Saved Edits</h3>
                <button onClick={() => setSavedEditsOpen(false)} className="text-white/40 hover:text-white text-2xl leading-none transition-colors">&times;</button>
              </div>
              <div className="px-8 py-6">
                {(() => {
                  const edits = JSON.parse(localStorage.getItem('saved_edits') || '[]');
                  if (edits.length === 0) return (
                    <p className="font-serif italic text-white/40">No saved edits yet.</p>
                  );
                  return (
                    <div className="space-y-3">
                      {edits.map((edit: any) => (
                        <div key={edit.id} className="border border-white/8 p-4 flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <div className="flex-1 pr-4">
                            <div className="text-[11px] font-serif text-white/60 italic">{edit.summary}</div>
                          </div>
                          <div className="flex gap-4 shrink-0">
                            <button
                              onClick={() => { setAnswers(edit.answers); setStep(steps.length); setSavedEditsOpen(false); }}
                              className="text-[10px] tracking-widest uppercase text-[#C5A059] hover:text-white transition-colors font-sans"
                            >
                              Reopen
                            </button>
                            <button
                              onClick={() => {
                                const newEdits = edits.filter((e: any) => e.id !== edit.id);
                                localStorage.setItem('saved_edits', JSON.stringify(newEdits));
                                setSavedEditsOpen(false);
                                setTimeout(() => setSavedEditsOpen(true), 10);
                              }}
                              className="text-[10px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors font-sans"
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
          </div>
        )}
      </div>
    );
  }

  // ── Step page ─────────────────────────────────────────────────────────

  const currentStep  = steps[step];
  const meta         = STEP_META[currentStep.id];
  const currentSels  = answers[currentStep.id];

  // Grid column class per option count
  const optCount = currentStep.options.length;
  const gridCols =
    optCount <= 3 ? 'grid-cols-1 sm:grid-cols-3'       :
    optCount <= 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' :
    optCount <= 6 ? 'grid-cols-2 md:grid-cols-3'        :
                    'grid-cols-2 md:grid-cols-4';

  const maxWidth =
    optCount <= 3 ? 'max-w-[860px]' :
    optCount <= 5 ? 'max-w-[1100px]' :
                    'max-w-[1200px]';

  return (
    <div className="min-h-screen" style={{ background: '#0E0C09' }}>

      {/* Step progress bar */}
      <div className="px-6 md:px-16 pt-10 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div key={i} className="relative flex items-center">
                <div
                  className="transition-all duration-500"
                  style={{
                    width: i === step ? '32px' : '16px',
                    height: '2px',
                    background: i < step
                      ? '#C5A059'
                      : i === step
                      ? '#C5A059'
                      : 'rgba(255,255,255,0.15)',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(197,160,89,0.5)' }}>
            {ROMAN[step]} / VII
          </div>
        </div>
        <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Question block + cards */}
      <div key={step} className={`journey-reveal mx-auto px-6 md:px-16 pb-10 ${maxWidth}`}>

        {/* Question heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="text-[10px] tracking-[0.35em] uppercase font-sans mb-4" style={{ color: 'rgba(197,160,89,0.7)' }}>
            {meta?.subtitle ?? ''}
          </div>
          <h2 className="font-serif italic text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
            {currentStep.title}
          </h2>
          <p className="mt-4 text-[11px] tracking-[0.2em] uppercase font-sans" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Select up to two &nbsp;·&nbsp; tap to choose
          </p>
        </div>

        {/* Image card grid */}
        <div className={`grid ${gridCols} gap-3 md:gap-4`}>
          {currentStep.options.map((opt, cardIdx) => {
            const isSelected = currentSels.includes(opt);
            const cardMeta   = meta?.cards[opt];
            const displayOpt = currentStep.id === 'budget'
              ? getBudgetLabel(opt, currency as CurrencyCode)
              : opt;

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="group relative overflow-hidden cursor-pointer text-left focus:outline-none"
                style={{
                  aspectRatio: '2 / 3',
                  animationDelay: `${cardIdx * 60}ms`,
                }}
              >
                {/* Image */}
                {cardMeta?.img && (
                  <img
                    src={cardMeta.img}
                    alt={opt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ willChange: 'transform' }}
                  />
                )}

                {/* Base gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.12) 100%)',
                  }}
                />

                {/* Hover warm glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(197,160,89,0.18) 0%, transparent 60%)',
                  }}
                />

                {/* Selected overlay */}
                {isSelected && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 0 2px #C5A059',
                        background: 'rgba(197,160,89,0.08)',
                      }}
                    />
                    {/* Gold corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0"
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '0 36px 36px 0',
                        borderColor: 'transparent #C5A059 transparent transparent',
                      }}
                    />
                    <div className="absolute top-1.5 right-1.5 text-[#0E0C09] text-[9px] font-bold leading-none">✓</div>
                  </>
                )}

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  {cardMeta?.tag && (
                    <div
                      className="text-[9px] tracking-[0.22em] uppercase font-sans mb-2 transition-colors duration-300"
                      style={{ color: isSelected ? '#C5A059' : 'rgba(255,255,255,0.5)' }}
                    >
                      {cardMeta.tag}
                    </div>
                  )}
                  <div
                    className="font-serif text-white leading-tight transition-all duration-300 group-hover:text-[#F0E6D0]"
                    style={{ fontSize: optCount > 6 ? '1.05rem' : '1.2rem' }}
                  >
                    {displayOpt}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Currency selector (budget step only) */}
        {currentStep.id === 'budget' && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Display prices in
            </div>
            <CurrencyDropdown currency={currency as CurrencyCode} setCurrency={c => setCurrency(c as any)} />
          </div>
        )}

      </div>

      {/* Navigation */}
      <div
        className="sticky bottom-0 z-20 px-6 md:px-16 py-5 flex items-center justify-between border-t border-white/8"
        style={{ background: 'rgba(14,12,9,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={handleBack}
          className={`text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-300
            ${step === 0
              ? 'opacity-0 pointer-events-none'
              : 'text-white/40 hover:text-white'
            }`}
        >
          ← Back
        </button>

        <div className="flex items-center gap-6">
          {currentSels.length > 0 && (
            <span className="text-[9px] tracking-[0.2em] uppercase font-sans hidden sm:block" style={{ color: 'rgba(197,160,89,0.6)' }}>
              {currentSels.length} selected
            </span>
          )}
          <button
            onClick={handleNext}
            disabled={currentSels.length === 0}
            className="px-9 py-3 text-[10px] tracking-[0.22em] uppercase font-sans font-medium transition-all duration-300
              disabled:opacity-30 disabled:pointer-events-none
              border border-[#C5A059] text-[#C5A059]
              hover:bg-[#C5A059] hover:text-[#0E0C09]"
          >
            {step === steps.length - 1 ? 'See Results' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
