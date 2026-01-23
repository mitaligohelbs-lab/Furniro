import { createSlice } from "@reduxjs/toolkit";

export const comparisionSlice = createSlice({
  name: "compareItem",
  initialState: { item: [] },
  reducers: {
    addToCompareItem: (state, action) => {
      state.item.push(action.payload);
    },
    removeCompareItem: (state, action) => {
      if (!state.item.length) return;
      state.item[0] = state.item[0].filter((id) => id !== action.payload);
    },
  },
});

export const { addToCompareItem, removeCompareItem } = comparisionSlice.actions;
export default comparisionSlice.reducer;
