import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useState, useRef, useEffect } from "react";
import { ProjectImpactModal } from "./ProjectImpactModal";
import { cn, CURRENCY_META } from "../lib/utils";

function NavCurrencyDropdown() {
  const { currency, setCurrency } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const label = currency === 'BOTH' ? 'USD·INR' : currency;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium transition-colors",
          open ? "text-ink" : "text-mid hover:text-ink"
        )}
      >
        <span>{label}</span>
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 10 6" fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-stone shadow-lg z-50 min-w-[200px] py-1">
          {CURRENCY_META.map((c, i) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code as any); setOpen(false); }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors",
                currency === c.code
                  ? "bg-stone/40 text-ink"
                  : "text-mid hover:bg-stone/20 hover:text-ink",
                i < CURRENCY_META.length - 1 ? "border-b border-stone/50" : ""
              )}
            >
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {c.code === 'BOTH' ? 'BOTH' : c.code}
              </span>
              <span className="text-[10px] tracking-wider text-mid">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const { wishlist, cart, setSearchOpen } = useStore();

  return (
    <>
      <div className="w-full bg-ink text-white text-[10px] tracking-[0.2em] py-2 text-center uppercase font-medium">
        Complimentary Shipping on All International Orders
      </div>
      <header className="w-full border-b border-stone bg-white/80 backdrop-blur-sm px-10 py-5 flex justify-between items-center z-10 sticky top-0">
        <div className="flex gap-8 text-[11px] uppercase tracking-widest font-medium text-mid">
          <Link to="/" className="hover:text-ink transition-colors">New Arrivals</Link>
          <Link to="/shop" className="hover:text-ink transition-colors">Collections</Link>
          <Link to="/journey" className="text-ink border-b border-gold pb-1">The Occasion Edit</Link>
        </div>
        <Link to="/" className="text-3xl font-serif tracking-[0.25em] pl-6 font-light uppercase text-ink hover:text-gold transition-colors">
          Là Fuori
        </Link>
        <div className="flex gap-8 items-center text-[11px] uppercase tracking-widest font-medium text-mid">
          <NavCurrencyDropdown />
          <button className="hover:text-ink transition-colors" onClick={() => setSearchOpen(true)}>Search</button>
          <Link to="/wishlist" className="hover:text-ink transition-colors">
            Wishlist {wishlist.length > 0 && <span className="lowercase">({wishlist.length})</span>}
          </Link>
          <button className="flex items-center gap-2 hover:text-ink transition-colors" onClick={() => navigate('/cart')}>
            {cart.length > 0 && (
              <span className="bg-ink text-white px-2 py-1 rounded-full text-[9px] leading-none flex items-center justify-center">
                {cart.length}
              </span>
            )}
            <span>Bag</span>
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  const [impactOpen, setImpactOpen] = useState(false);

  return (
    <>
      <footer className="w-full border-t border-stone bg-white px-10 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-10 text-[10px] uppercase tracking-widest text-mid mb-6 md:mb-0">
          <Link to="/" className="hover:text-ink">About</Link>
          <span className="hover:text-ink cursor-pointer">Contact</span>
          <span className="hover:text-ink cursor-pointer">Returns</span>
          <button 
            className="text-ink font-bold border border-ink px-3 py-1 -mt-1 hover:bg-ink hover:text-white transition-colors"
            onClick={() => setImpactOpen(true)}
          >
            Project Impact
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-mid uppercase tracking-widest mb-1">Stay Informed</span>
            <div className="flex border-b border-mid/50 pb-1 focus-within:border-ink transition-colors">
              <input type="text" placeholder="Enter your email" className="bg-transparent text-[11px] outline-none min-w-[200px] italic font-serif text-ink placeholder:text-mid" />
              <button className="text-[10px] uppercase tracking-widest ml-4 text-ink font-medium hover:text-gold transition-colors">Join</button>
            </div>
          </div>
        </div>
      </footer>
      <ProjectImpactModal isOpen={impactOpen} onClose={() => setImpactOpen(false)} />
    </>
  );
}
