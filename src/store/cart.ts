import { create } from "zustand";

type ProductAttributes = {
  product_id: string;
  title: string;
  name: string;
  description: string;
  amount: number;
  colors: string;
  types: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  is_unique: boolean;
  quantity: number;
  image: string;
};

type Product = {
  id: number;
  attributes: ProductAttributes;
};

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, newQuantity: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item?.quantity + quantity,
                    product.attributes.quantity
                  ),
                }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { product, quantity }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  updateCartItemQuantity: (productId, newQuantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(
                0,
                Math.min(newQuantity, item.product.attributes.quantity)
              ),
            }
          : item
      ),
    })),
}));

export default useCartStore;
