import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isPending: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdmin: (state, action) => {
      state.admin = action.payload;
    },
    updateIsPending: (state, action) => {
      state.isPending = action.payload;
    },
  },
});

export const { updateAdmin, updateIsPending } = adminSlice.actions;

export default adminSlice.reducer;
