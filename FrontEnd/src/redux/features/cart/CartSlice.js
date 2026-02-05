import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, totalAmount: 0 },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, src, quantity } = action.payload;
      const itemFound = state.items.find((item) => item.id === id);
      if (!itemFound) {
        state.items.push({
          id,
          name,
          price,
          src,
          quantity,
        });
        state.totalQuantity += quantity;
        state.totalAmount += quantity * +price;
      } else {
        itemFound.quantity = quantity;
        itemFound.totalQuantity = quantity;
        itemFound.totalAmount = quantity * +price;
      }
    },

    increseQuantity: (state, action) => {
      const item = state.items.find(({ id }) => id === action.payload);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalAmount += +item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(({ id }) => id === action.payload);
      if (item) {
        item.quantity--;
        state.totalQuantity--;
        state.totalAmount -= +item.price;
      }
      if (item.quantity === 0) {
        state.items = state.items.filter(({ id }) => id !== action.payload);
      }
    },

    removeItem: (state, action) => {
      const item = state.items.find(({ id }) => id === action.payload);
      if (item) {
        state.items = state.items.filter(({ id }) => id !== action.payload);
        state.totalAmount = state.totalAmount - item.price * item.quantity;
        state.totalQuantity = state.totalQuantity - item.quantity;
      }
    },
  },
});

export const { addToCart, increseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
