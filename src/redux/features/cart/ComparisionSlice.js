import { createSlice } from "@reduxjs/toolkit";

export const comparisionSlice = createSlice({
  name: "compareItem",
  initialState: { item: [] },
  reducers: {
    addCompareItem: (state, action) => {
      const id = action.payload;
      if (state.item.includes(id)) return;
      if (state.item.length > 5) {
        return;
      }
      state.item.push(+id);
    },
    removeCompareItem: (state, action) => {
      if (!state.item.length) return;
      state.item = state.item.filter((id) => id !== action.payload);
    },
  },
});

export const { addCompareItem, removeCompareItem } = comparisionSlice.actions;
export default comparisionSlice.reducer;
