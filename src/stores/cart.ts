// stores/useCartStore.ts
import { http } from "@/lib/http";
import { ICartItem, IPayloadOrder } from "@/types/web/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICartStore {
  cart: ICartItem[];
  _api: { sendOrder: string };
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isCartOpen: boolean;
  _sendFormOrder: (payload: IPayloadOrder) => Promise<any>;
  setCartOpen: (isOpen: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      _api: {
        sendOrder: "/web/order"
      },
      isCartOpen: false,

      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            cart: cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id)
        }));
      },

      setCartOpen: (isOpen) => {
        set({ isCartOpen: isOpen });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) return;
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item))
        }));
      },

      _sendFormOrder: async (payload: IPayloadOrder) => {
        const { _api } = get();
        const endpoint = _api.sendOrder;
        return await http.post(endpoint, payload);
      },

      clearCart: () => set({ cart: [] })
    }),
    {
      name: "cart-storage", // Tên key trong localStorage
      getStorage: () => localStorage // Có thể cấu hình thành sessionStorage nếu muốn
    }
  )
);
