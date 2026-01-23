import { createSlice } from "@reduxjs/toolkit";

export const comparisionSlice = createSlice({
  name: "compareItem",
  initialState: { item: [] },
  reducers: {
    addToCompareItem: (state, action) => {
      state.item.push(action.payload);
    },
  },
});

export const { addToCompareItem } = comparisionSlice.actions;
export default comparisionSlice.reducer;
