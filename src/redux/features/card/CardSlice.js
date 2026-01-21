import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: { id: "" },
  reducers: {
    addToCard: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { addToCard } = cardSlice.actions;
export default cardSlice.reducer;
