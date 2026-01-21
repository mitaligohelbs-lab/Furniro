import { configureStore } from "@reduxjs/toolkit";
import { addToCard } from "./features/card/CardSlice";
import addToCart from "./features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    card: addToCard,
    cart: addToCart,
  },
});
