import React from "react";
import { Link } from "react-router-dom";
import { type Product } from "../data";
import { cn, formatPrice } from "../lib/utils";
import { useStore } from "../store";

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  matchScore?: number;
  badgeLabel?: string;
}

export function ProductCard({ product, matchScore, badgeLabel }: ProductCardProps) {
  const getMatchLabel = (score: number) => {
    if (badgeLabel) return badgeLabel;
    if (score >= 90) return "Best Match";
    if (score >= 70) return "Strong Match";
    return "Alternative Pick";
  };

  const getStylistNote = (score: number) => {
    if (score >= 90) return "Stylist's Favorite";
    if (score >= 70) return "Ideal for Setting";
    return "Modern Silhouette";
  };

  const { wishlist, addToWishlist, removeFromWishlist, currency } = useStore();
  
  const isWishlisted = Boolean(wishlist.find(p => p.id === product.id));

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group flex flex-col cursor-pointer transition-opacity">
      <Link to={`/product/${product.id}`} className="block relative w-full h-full">
        <div className="relative aspect-[3/4] bg-stone mb-4 overflow-hidden border border-stone-200">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
          
          <img 
            src={product.i1} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0" 
            loading="lazy" 
          />
          <img 
            src={product.i2} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-[1.02]" 
            loading="lazy" 
          />
          
          {/* Badges */}
          {matchScore ? (
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] uppercase tracking-widest text-ink z-20 shadow-sm backdrop-blur-sm">
              {getMatchLabel(matchScore)}
            </div>
          ) : (
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] uppercase tracking-widest text-ink z-20 shadow-sm backdrop-blur-sm">
              {product.coll}
            </div>
          )}
          
          {/* Hover Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity duration-300 z-20 pointer-events-none">
            <button className="bg-white px-6 py-3 text-[10px] uppercase tracking-widest text-ink shadow-sm hover:bg-ink hover:text-white transition-colors duration-300 pointer-events-auto">
              View Piece
            </button>
          </div>
          
          {/* Wishlist Icon */}
          <button 
            className={cn(
              "absolute top-4 right-4 text-lg bg-white/90 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm z-30 pointer-events-auto",
              isWishlisted ? "opacity-100 text-gold" : "opacity-0 group-hover:opacity-100 hover:text-gold text-ink"
            )}
            onClick={toggleWishlist}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] uppercase font-medium tracking-wider text-ink pr-2 leading-tight">
              {product.name}
            </span>
            <span className="text-[12px] font-serif text-ink whitespace-nowrap">
              {formatPrice(product.price, currency)}
            </span>
          </div>
          
          <div className="text-[10px] text-mid uppercase tracking-widest mb-2">
            {product.type}
          </div>

          {/* Match Info Footer */}
          {matchScore && (
             <div className="mt-auto pt-3 border-t border-stone flex items-center justify-between">
               <span className="text-[10px] text-gold font-medium tracking-widest uppercase">
                 Occasion Suitability
               </span>
               <span className="text-[11px] font-serif italic text-ink">
                 {getStylistNote(matchScore)}
               </span>
             </div>
          )}
        </div>
      </Link>
    </div>
  );
}
