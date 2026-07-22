import { create } from "zustand";
import { persist } from "zustand/middleware";

function wishlistKey(productId: string, colorName: string) {
  return `${productId}::${colorName}`;
}

function parseWishlistKey(key: string): { productId: string; colorName: string } {
  const [productId, colorName] = key.split("::");
  return { productId, colorName };
}

type WishlistState = {
  keys: string[];
  toggle: (productId: string, colorName: string) => void;
  isWishlisted: (productId: string, colorName: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      keys: [],
      toggle: (productId, colorName) => {
        const key = wishlistKey(productId, colorName);
        set((state) => ({
          keys: state.keys.includes(key)
            ? state.keys.filter((k) => k !== key)
            : [...state.keys, key],
        }));
      },
      isWishlisted: (productId, colorName) =>
        get().keys.includes(wishlistKey(productId, colorName)),
    }),
    { name: "mikolo-wishlist" }
  )
);

export { parseWishlistKey };
