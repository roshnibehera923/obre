import { useState, useRef, useEffect } from 'react';
import { CAT, scoreOccasion } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store';
import { CURRENCY_META, getBudgetLabel, type CurrencyCode } from '../lib/utils';

// ─── Brand tokens ──────────────────────────────────────────────────────────
const T = {
  ivory:   '#FAF7F1',
  beige:   '#F5EFE6',
  parchment: '#F0EBE3',
  border:  '#DED6C8',
  gold:    '#C8A66A',
  goldMid: 'rgba(200,166,106,0.45)',
  ink:     '#1F1F1F',
  mid:     '#7A6E64',
  muted:   '#A89E94',
};

// ─── Step visual metadata ──────────────────────────────────────────────────
const STEP_META: Record<string, {
  subtitle: string;
  cards: Record<string, { img: string; tag: string }>;
}> = {
  occasion: {
    subtitle: 'Curated pieces tailored to your moment.',
    cards: {
      'Wedding Guest':       { img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Garden venue elegance' },
      'Evening Gala':        { img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Grand ballroom splendour' },
      'Cocktail Party':      { img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Luxury lounge ambience' },
      'Festive Celebration': { img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Jewel-toned festive warmth' },
      'Resort Holiday':      { img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Sunlit resort serenity' },
      'Corporate Event':     { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Polished architectural precision' },
    },
  },
  timeOfDay: {
    subtitle: 'Let the light define your look.',
    cards: {
      'Day':     { img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Soft morning luminosity' },
      'Evening': { img: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Golden-hour warmth' },
      'Night':   { img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Chandelier-lit after-dark' },
    },
  },
  location: {
    subtitle: 'The setting shapes the silhouette.',
    cards: {
      'Indoor':      { img: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Marble & grandeur' },
      'Outdoor':     { img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe2e2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Garden courtyard grace' },
      'Beach':       { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Coastal resort ease' },
      'Destination': { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Heritage landscape wonder' },
      'City':        { img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Urban luxury exterior' },
    },
  },
  mood: {
    subtitle: 'Define the energy of your look.',
    cards: {
      'Minimal':  { img: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Clean quiet luxury' },
      'Romantic': { img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc2e?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Soft floral poetry' },
      'Bold':     { img: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Architectural drama' },
      'Dramatic': { img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Cinematic grandeur' },
      'Elegant':  { img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Timeless refinement' },
      'Playful':  { img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Vibrant joyful colour' },
    },
  },
  budget: {
    subtitle: 'A wardrobe investment, made beautifully.',
    cards: {
      'Under $1,000':  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Refined considered luxury' },
      '$1,000–$2,000': { img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Artisan craftsmanship' },
      '$2,000+':       { img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Couture atelier excellence' },
    },
  },
  colour: {
    subtitle: 'Colour is your first impression.',
    cards: {
      'Pastel':     { img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc2e?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Soft ethereal palette' },
      'Jewel Tone': { img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Rich chromatic depth' },
      'Neutral':    { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Understated ivory ease' },
      'Metallic':   { img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Light-catching shimmer' },
      'Vibrant':    { img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Unapologetic bold colour' },
      'Noir':       { img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Moody black elegance' },
    },
  },
  silhouette: {
    subtitle: 'Choose the structure that reflects your style.',
    cards: {
      'Mini':          { img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Cocktail venue energy' },
      'Midi':          { img: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Refined balanced proportion' },
      'Floor-Length':  { img: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Sweeping vertical drama' },
      'Gown':          { img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Ballroom couture grandeur' },
      'A-Line':        { img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe2e2?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Feminine arched grace' },
      'Body-Skimming': { img: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Sleek sculptural line' },
      'Flowing':       { img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&h=800&q=80', tag: 'Soft movement & drape' },
    },
  },
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

// ─── Currency dropdown — ivory / light theme ───────────────────────────────
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
        className="flex items-center gap-3 px-5 py-3 transition-all duration-300 border"
        style={{
          background: T.ivory,
          borderColor: open ? T.gold : T.border,
        }}
      >
        <span
          className="font-sans text-[11px] tracking-[0.2em] uppercase font-medium"
          style={{ color: T.gold }}
        >
          {active.code === 'BOTH' ? 'USD · INR' : active.code}
        </span>
        <span className="font-sans text-[10px] tracking-widest" style={{ color: T.muted }}>—</span>
        <span className="font-sans text-[10px] tracking-widest uppercase" style={{ color: T.mid }}>
          {active.name}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: T.gold }}
          viewBox="0 0 12 8" fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-px border overflow-hidden"
          style={{ background: T.ivory, borderColor: T.border, minWidth: '260px', boxShadow: '0 8px 32px rgba(31,20,10,0.08)' }}
        >
          {CURRENCY_META.map((c, i) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors duration-150"
              style={{
                background: currency === c.code ? `rgba(200,166,106,0.10)` : 'transparent',
                borderBottom: i < CURRENCY_META.length - 1 ? `1px solid ${T.border}` : 'none',
              }}
            >
              <span
                className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium"
                style={{ color: currency === c.code ? T.gold : T.ink }}
              >
                {c.code === 'BOTH' ? 'BOTH' : c.code}
              </span>
              <span
                className="font-sans text-[10px] tracking-widest uppercase"
                style={{ color: T.muted }}
              >
                {c.name}
              </span>
              {currency === c.code && (
                <span style={{ color: T.gold }} className="text-xs ml-2">✦</span>
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
      <div className="min-h-screen" style={{ background: T.ivory }}>

        {/* Results header */}
        <div
          className="relative px-6 md:px-16 py-20 text-center border-b"
          style={{ background: T.beige, borderColor: T.border }}
        >
          <div className="text-[10px] tracking-[0.35em] uppercase mb-5 font-sans" style={{ color: T.gold }}>
            Your Curated Edit
          </div>
          <h1 className="font-serif italic text-5xl md:text-6xl mb-8" style={{ color: T.ink }}>
            Curated For You
          </h1>
          <div
            className="inline-block border px-8 py-4"
            style={{ background: T.ivory, borderColor: T.border }}
          >
            <div className="text-[10px] tracking-[0.25em] uppercase mb-2 font-sans" style={{ color: T.gold }}>
              Your Selections
            </div>
            <div className="text-[13px] font-serif italic" style={{ color: T.mid }}>
              {summaryString || 'No selections made'}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="px-6 md:px-16 py-16">
          {finalResults.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif italic text-2xl" style={{ color: T.mid }}>No exact matches found.</p>
              <p className="font-sans text-[11px] tracking-widest uppercase mt-4" style={{ color: T.muted }}>
                Try broadening your selections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {finalResults.map((item) => (
                <div key={item.p.id} className="flex flex-col border" style={{ background: T.ivory, borderColor: T.border }}>
                  <div className="flex-1 p-4">
                    <ProductCard product={item.p} matchScore={Math.min(item.s, 98)} badgeLabel={item.type} />
                  </div>
                  <div className="px-4 pb-5 pt-3 border-t" style={{ background: T.beige, borderColor: T.border }}>
                    <div className="text-[9px] tracking-[0.25em] uppercase mb-2 font-sans" style={{ color: T.gold }}>
                      Why This Works
                    </div>
                    <p className="text-[11px] font-serif leading-relaxed italic" style={{ color: T.mid }}>
                      {generateExplainability(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA bar */}
        <div className="border-t px-6 md:px-16 py-10 flex flex-col sm:flex-row justify-center items-center gap-5" style={{ borderColor: T.border, background: T.beige }}>
          <button
            onClick={() => setStep(0)}
            className="px-9 py-3 border text-[10px] tracking-[0.2em] uppercase font-sans transition-all duration-300 hover:border-[#1F1F1F]"
            style={{ borderColor: T.border, color: T.mid, background: T.ivory }}
          >
            Refine Your Edit
          </button>
          <button
            onClick={saveEdit}
            className="px-9 py-3 border text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300"
            style={{ borderColor: T.gold, color: T.gold, background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = T.gold; (e.currentTarget as HTMLButtonElement).style.color = T.ivory; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = T.gold; }}
          >
            Save This Edit
          </button>
          <button
            onClick={() => setSavedEditsOpen(true)}
            className="text-[10px] tracking-[0.2em] uppercase underline underline-offset-4 transition-colors font-sans"
            style={{ color: T.muted }}
          >
            View Saved Edits
          </button>
        </div>

        {/* Saved Edits Modal */}
        {savedEditsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(31,20,10,0.35)' }}>
            <div
              className="w-full max-w-[580px] max-h-[80vh] overflow-y-auto border"
              style={{ background: T.ivory, borderColor: T.border, boxShadow: '0 16px 48px rgba(31,20,10,0.12)' }}
            >
              <div className="flex justify-between items-center px-8 py-6 border-b" style={{ borderColor: T.border }}>
                <h3 className="text-2xl font-serif italic" style={{ color: T.ink }}>Saved Edits</h3>
                <button
                  onClick={() => setSavedEditsOpen(false)}
                  className="text-2xl leading-none transition-colors"
                  style={{ color: T.muted }}
                >
                  &times;
                </button>
              </div>
              <div className="px-8 py-6">
                {(() => {
                  const edits = JSON.parse(localStorage.getItem('saved_edits') || '[]');
                  if (edits.length === 0) return (
                    <p className="font-serif italic" style={{ color: T.muted }}>No saved edits yet.</p>
                  );
                  return (
                    <div className="space-y-3">
                      {edits.map((edit: any) => (
                        <div
                          key={edit.id}
                          className="border p-4 flex justify-between items-center"
                          style={{ borderColor: T.border, background: T.beige }}
                        >
                          <div className="flex-1 pr-4">
                            <div className="text-[11px] font-serif italic" style={{ color: T.mid }}>{edit.summary}</div>
                          </div>
                          <div className="flex gap-4 shrink-0">
                            <button
                              onClick={() => { setAnswers(edit.answers); setStep(steps.length); setSavedEditsOpen(false); }}
                              className="text-[10px] tracking-widest uppercase font-sans transition-colors"
                              style={{ color: T.gold }}
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
                              className="text-[10px] tracking-widest uppercase font-sans transition-colors"
                              style={{ color: T.muted }}
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

  const currentStep = steps[step];
  const meta        = STEP_META[currentStep.id];
  const currentSels = answers[currentStep.id];

  const optCount = currentStep.options.length;
  const gridCols =
    optCount <= 3 ? 'grid-cols-1 sm:grid-cols-3'            :
    optCount <= 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' :
    optCount <= 6 ? 'grid-cols-2 md:grid-cols-3'             :
                    'grid-cols-2 md:grid-cols-4';

  const maxWidth =
    optCount <= 3 ? 'max-w-[860px]'  :
    optCount <= 5 ? 'max-w-[1100px]' :
                    'max-w-[1200px]';

  return (
    <div className="min-h-screen" style={{ background: T.ivory }}>

      {/* Progress header */}
      <div className="px-6 md:px-16 pt-10 pb-6">
        <div className="flex items-center justify-between mb-4">
          {/* Step dashes */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div key={i} className="transition-all duration-500" style={{
                width: i === step ? '32px' : '14px',
                height: '2px',
                background: i <= step ? T.gold : T.border,
              }} />
            ))}
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: T.goldMid }}>
            {ROMAN[step]} / VII
          </div>
        </div>
        <div className="h-px w-full" style={{ background: T.border }} />
      </div>

      {/* Question + cards */}
      <div key={step} className={`journey-reveal mx-auto px-6 md:px-16 pb-10 ${maxWidth}`}>

        {/* Question heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="text-[10px] tracking-[0.35em] uppercase font-sans mb-4" style={{ color: T.gold }}>
            {meta?.subtitle ?? ''}
          </div>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ color: T.ink }}>
            {currentStep.title}
          </h2>
          <p className="mt-4 text-[11px] tracking-[0.2em] uppercase font-sans" style={{ color: T.muted }}>
            Select up to two &nbsp;·&nbsp; tap to choose
          </p>
        </div>

        {/* Image cards */}
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
                className="group relative overflow-hidden cursor-pointer text-left focus:outline-none border transition-all duration-300"
                style={{
                  aspectRatio: '2 / 3',
                  animationDelay: `${cardIdx * 60}ms`,
                  borderColor: isSelected ? T.gold : T.border,
                  boxShadow: isSelected
                    ? `0 0 0 1px ${T.gold}, 0 4px 20px rgba(200,166,106,0.15)`
                    : '0 2px 12px rgba(31,20,10,0.06)',
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

                {/* Warm ivory overlay — light at bottom for text legibility */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(250,247,241,0.94) 0%, rgba(250,247,241,0.42) 48%, rgba(250,247,241,0.08) 100%)',
                  }}
                />

                {/* Hover brightening */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(200,166,106,0.10) 0%, transparent 55%)',
                  }}
                />

                {/* Selected accent — gold corner flag */}
                {isSelected && (
                  <>
                    <div className="absolute top-0 right-0 w-0 h-0" style={{
                      borderStyle: 'solid',
                      borderWidth: '0 34px 34px 0',
                      borderColor: `transparent ${T.gold} transparent transparent`,
                    }} />
                    <div className="absolute top-1.5 right-1.5 font-bold leading-none" style={{ color: T.ivory, fontSize: '9px' }}>✓</div>
                  </>
                )}

                {/* Text — dark on light overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  {cardMeta?.tag && (
                    <div
                      className="text-[9px] tracking-[0.22em] uppercase font-sans mb-2 transition-colors duration-300"
                      style={{ color: isSelected ? T.gold : T.muted }}
                    >
                      {cardMeta.tag}
                    </div>
                  )}
                  <div
                    className="font-serif leading-tight transition-all duration-300"
                    style={{
                      color: T.ink,
                      fontSize: optCount > 6 ? '1.0rem' : '1.15rem',
                    }}
                  >
                    {displayOpt}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Currency selector — budget step only */}
        {currentStep.id === 'budget' && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: T.muted }}>
              Display prices in
            </div>
            <CurrencyDropdown currency={currency as CurrencyCode} setCurrency={c => setCurrency(c as any)} />
          </div>
        )}
      </div>

      {/* Sticky navigation bar — ivory frosted */}
      <div
        className="sticky bottom-0 z-20 px-6 md:px-16 py-5 flex items-center justify-between border-t"
        style={{
          background: 'rgba(250,247,241,0.97)',
          backdropFilter: 'blur(12px)',
          borderColor: T.border,
        }}
      >
        <button
          onClick={handleBack}
          className={`text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-300 ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          style={{ color: T.muted }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = T.ink; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = T.muted; }}
        >
          ← Back
        </button>

        <div className="flex items-center gap-6">
          {currentSels.length > 0 && (
            <span className="text-[9px] tracking-[0.2em] uppercase font-sans hidden sm:block" style={{ color: T.gold }}>
              {currentSels.length} selected
            </span>
          )}
          <button
            onClick={handleNext}
            disabled={currentSels.length === 0}
            className="px-9 py-3 text-[10px] tracking-[0.22em] uppercase font-sans font-medium transition-all duration-300 border disabled:opacity-30 disabled:pointer-events-none"
            style={{ borderColor: T.gold, color: T.gold, background: 'transparent' }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement;
              if (!b.disabled) { b.style.background = T.gold; b.style.color = T.ivory; }
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = 'transparent'; b.style.color = T.gold;
            }}
          >
            {step === steps.length - 1 ? 'See Results' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
