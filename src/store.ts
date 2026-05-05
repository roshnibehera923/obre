import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './data';

interface CartItem {
  id: string;
  product: Product;
  config: any;
}

interface AppState {
  wishlist: Product[];
  cart: CartItem[];
  searchOpen: boolean;
  currency: 'USD' | 'INR' | 'BOTH';
  setCurrency: (currency: 'USD' | 'INR' | 'BOTH') => void;
  setSearchOpen: (open: boolean) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      wishlist: [],
      cart: [],
      searchOpen: false,
      currency: 'BOTH',
      setCurrency: (currency) => set({ currency }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      addToWishlist: (product) => set((state) => {
        if (state.wishlist.find(p => p.id === product.id)) return state;
        return { wishlist: [...state.wishlist, product] };
      }),
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(p => p.id !== productId)
      })),
      addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
      })),
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter(i => i.id !== itemId)
      }))
    }),
    {
      name: 'lafuori-storage',
      partialize: (state) => ({ currency: state.currency, cart: state.cart, wishlist: state.wishlist }),
    }
  )
);

