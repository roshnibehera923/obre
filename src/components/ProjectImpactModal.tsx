import { useState } from "react";
import { Link } from "react-router-dom";

export function ProjectImpactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 py-12 overflow-y-auto">
      <div className="bg-white max-w-[800px] w-full border border-stone relative my-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-mid hover:text-ink text-xl transition-colors"
        >
          ✕
        </button>
        
        <div className="p-10 md:p-14">
          <div className="text-center mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink mb-4">Academic Evaluation</h2>
            <h1 className="text-3xl font-serif text-ink italic mb-4">Project Impact</h1>
            <p className="text-[13px] font-serif text-charcoal leading-relaxed max-w-[600px] mx-auto">
              How the Occasion-Based Recommendation Engine (OBRE) improves the existing luxury e-commerce experience for Là Fuori.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-cream border border-stone p-6">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-ink mb-3">1. Reduces Decision Fatigue</h3>
              <p className="text-[12px] font-serif text-charcoal leading-relaxed">
                Occasion-led filtering reduces the number of irrelevant products shown to the customer, guiding focus intentionally.
              </p>
            </div>
            <div className="bg-cream border border-stone p-6">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-ink mb-3">2. Improves Product Relevance</h3>
              <p className="text-[12px] font-serif text-charcoal leading-relaxed">
                Recommendations are based on event context, silhouette, embellishment, colour, budget, and formality—mimicking a stylist.
              </p>
            </div>
            <div className="bg-cream border border-stone p-6">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-ink mb-3">3. Supports Cross-Sell and Upsell</h3>
              <p className="text-[12px] font-serif text-charcoal leading-relaxed">
                Complete-the-look suggestions and occasion-driven customization upgrades create additional commercial value seamlessly.
              </p>
            </div>
            <div className="bg-cream border border-stone p-6">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-ink mb-3">4. Builds Purchase Confidence</h3>
              <p className="text-[12px] font-serif text-charcoal leading-relaxed">
                Stylist notes and explicit recommendation reasons help customers understand exactly why a garment suits their specific occasion.
              </p>
            </div>
          </div>

          <div className="border border-stone p-8 bg-ivory text-center">
             <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink mb-6">Experience Transformation</h3>
             <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10">
               <div>
                 <div className="text-[10px] uppercase tracking-widest text-mid mb-2">Before</div>
                 <div className="font-serif text-xl text-ink">Category-based browsing</div>
               </div>
               <div className="text-gold text-2xl">→</div>
               <div>
                 <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">After</div>
                 <div className="font-serif text-xl text-ink">Occasion-led guided discovery</div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
