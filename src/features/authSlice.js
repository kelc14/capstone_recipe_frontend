import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  //   success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
    deleteBook: (state, action) => {
      state.userInfo.books = state.userInfo.books.filter(
        (book) => book.id !== action
      );
    },
  },
  extraReducers: {
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //   state.userInfo = payload;
      state.userToken = payload;
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [signupUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //   state.userInfo = payload;
      state.userToken = payload;
    },

    [signupUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { updateUserInfo, logoutUser, deleteBook } = authSlice.actions;

export default authSlice.reducer;
