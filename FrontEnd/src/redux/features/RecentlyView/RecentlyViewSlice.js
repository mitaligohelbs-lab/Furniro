import { createSlice } from "@reduxjs/toolkit";

export const recentlyViewSlice = createSlice({
  name: "recentlyView",
  initialState: { items: [] },
  reducers: {
    addToRecentlyViewCard: (state, action) => {
      const { id } = action.payload;
      const itemFound = state.items.find((item) => item.id === id);
      if (!itemFound) {
        if (state.items.length === 6) {
          return;
        }
        state.items.push(action.payload);
      }
    },
    deleteRecentlyViewCard: (state) => {
      state.items = [];
    },
  },
});

export const { addToRecentlyViewCard, deleteRecentlyViewCard } =
  recentlyViewSlice.actions;
export default recentlyViewSlice.reducer;
