import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  changeQuantity: (productId: string, color: string, size: string, delta: number) => void;
  clear: () => void;
  totalCount: () => number;
  subtotal: () => number;
};

const sameLine = (a: CartItem, productId: string, color: string, size: string) =>
  a.productId === productId && a.color === color && a.size === size;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) =>
            sameLine(i, item.productId, item.color, item.size)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item.productId, item.color, item.size)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, productId, color, size)),
        }));
      },

      changeQuantity: (productId, color, size, delta) => {
        set((state) => ({
          items: state.items
            .map((i) =>
              sameLine(i, productId, color, size)
                ? { ...i, quantity: Math.max(1, i.quantity + delta) }
                : i
            )
            .filter((i) => i.quantity > 0),
        }));
      },

      clear: () => set({ items: [] }),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    }),
    { name: "mikolo-cart" }
  )
);
