import { IFruit } from "@/types/fruit/fruit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface CartItem {
  fruit: IFruit;
  ordered_quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add or update quantity if product exists
    addToCart: (state, action: PayloadAction<IFruit>) => {
      const existing = state.items.find(
        (item) => item.fruit._id === action.payload._id
      );

      if (existing) {
        existing.ordered_quantity += existing.fruit.quantity;
      } else {
        state.items.push({
          fruit: action.payload,
          ordered_quantity: action.payload.quantity,
        });
      }
    },

    // Increase quantity
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.fruit._id === action.payload
      );
      if (item) item.ordered_quantity += item.fruit.quantity;
    },

    // Decrease quantity (and remove if 0)
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.fruit._id === action.payload
      );
      if (item) {
        if (item.ordered_quantity > item.fruit.quantity) {
          item.ordered_quantity -= item.fruit.quantity;
        }
      }
    },

    // Remove item completely
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.fruit._id !== action.payload
      );
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) =>
      total +
      item.fruit.offer_price * (item.ordered_quantity / item.fruit.quantity),
    0
  );

export const selectCartItems = (state: RootState) => state.cart.items;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
