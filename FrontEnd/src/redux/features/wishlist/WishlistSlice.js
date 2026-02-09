import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {
    addToWhistListItem: (state, action) => {
      const { id, name, src, price } = action.payload;
      const itemFound = state.items.find((item) => item.id === id);
      if (!itemFound) {
        state.items.push({
          id,
          name,
          src,
          price,
        });
      }
    },

    removeFromWhistList: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addToWhistListItem, removeFromWhistList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
