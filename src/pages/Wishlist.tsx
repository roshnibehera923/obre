import { Link } from "react-router-dom";
import { useStore } from "../store";
import { ProductCard } from "../components/ProductCard";

export default function Wishlist() {
  const wishlist = useStore(state => state.wishlist);

  return (
    <div className="py-20 px-10 max-w-[1600px] mx-auto min-h-screen bg-ivory">
      <div className="mb-12 border-b border-stone pb-6">
        <h1 className="text-4xl font-serif italic text-ink">Your Wishlist</h1>
        <div className="text-[10px] tracking-widest uppercase text-mid mt-2">
          {wishlist.length} {wishlist.length === 1 ? 'Piece' : 'Pieces'} Saved
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-32 text-center min-h-[50vh]">
          <h2 className="text-2xl font-serif italic text-mid mb-8">Your wishlist is empty.</h2>
          <Link to="/shop" className="inline-flex items-center justify-center text-[10px] uppercase tracking-widest px-8 py-3 bg-white text-ink border border-ink hover:bg-ink hover:text-white transition-colors duration-300">
            Discover the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
