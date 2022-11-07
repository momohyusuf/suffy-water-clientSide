import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
