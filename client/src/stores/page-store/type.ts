export type TPageStore = {
  pageName: string;
  setPageName: (pageName: string) => void;
  cartItems: any[];
  setCartItems: (cartItems: any[]) => void;
};
