import { createSlice } from "@reduxjs/toolkit";
import { getBookDetails } from "./bookActions";

const initialState = {
  book: null,
  bookLoading: false,
  bookError: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: {
    // get details for single book
    [getBookDetails.pending]: (state) => {
      state.bookLoading = true;
      state.bookError = null;
    },
    [getBookDetails.fulfilled]: (state, { payload }) => {
      state.bookLoading = false;
      state.book = { ...payload.book };
    },

    [getBookDetails.rejected]: (state, { payload }) => {
      state.bookLoading = false;
      state.bookError = payload;
    },
  },
});

// export const { updateUserInfo, logoutUser, deleteBook } = authSlice.actions;

export default bookSlice.reducer;
