import { createSlice } from "@reduxjs/toolkit";

export const comparisionSlice = createSlice({
  name: "compareItem",
  initialState: { item: [] },
  reducers: {
    addToCompareItem: (state, action) => {
      state.item.push(action.payload);
    },
    removeCompareItem: (state, action) => {
      const selectedIds = state.item.find(({ id }) => +id === action.payload);
      if (selectedIds) {
        state.item.filter(({ id }) => +id !== action.payload);
      }
    },
  },
});

export const { addToCompareItem, removeCompareItem } = comparisionSlice.actions;
export default comparisionSlice.reducer;
