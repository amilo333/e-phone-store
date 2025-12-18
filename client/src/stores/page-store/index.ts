import { create } from "zustand";
import type { TPageStore } from "./type";

export const usePageStore = create<TPageStore>((set) => ({
  pageName: "",
  setPageName: (pageName) => set(() => ({ pageName })),
  cartItems: [],
  setCartItems: (cartItems) => set(() => ({ cartItems })),
}));
