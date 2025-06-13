import { IFruit } from "@/types/fruit/fruit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cart/cartSlice";
import { RootState } from "@/redux/store";

export interface OrderItem {
  fruit: IFruit;
  quantity: number;
}

interface OrderState {
  items: OrderItem[];
}

const initialState: OrderState = {
  items: [],
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<IFruit>) => {
      state.items = [];
      state.items.push({
        fruit: action.payload,
        quantity: action.payload.quantity,
      });
    },
    addMultipleToOrder: (state, action: PayloadAction<CartItem[]>) => {
      state.items = [];
      action.payload?.map((item: CartItem) =>
        state.items.push({
          fruit: item.fruit,
          quantity: item.ordered_quantity,
        })
      );
    },
    increaseOrderQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.fruit._id === action.payload
      );
      if (item) item.quantity += item.fruit.quantity;
    },
    decreaseOrderQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.fruit._id === action.payload
      );
      if (item) {
        if (item.quantity > item.fruit.quantity) {
          item.quantity -= item.fruit.quantity;
        }
      }
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.fruit._id !== action.payload
      );
    },
    clearOrder: (state) => {
      state.items = [];
    },
  },
});

export const selectOrderItems = (state: RootState) => state.order.items;
export const selectOrderTotalPrice = (state: RootState) =>
  state.order.items.reduce(
    (total, item) =>
      total + (item.fruit.offer_price * item.quantity) / item.fruit.quantity,
    0
  );

export const {
  addToOrder,
  addMultipleToOrder,
  clearOrder,
  increaseOrderQuantity,
  decreaseOrderQuantity,
  removeFromOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
