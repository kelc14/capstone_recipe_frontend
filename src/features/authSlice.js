import { createSlice } from "@reduxjs/toolkit";
import {
  authenticateUser,
  loginUser,
  signupUser,
  updateUser,
} from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
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
    addBook: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        books: [...state.userInfo.books, action.payload],
      };
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
      state.userInfo = payload.user;
      state.userToken = payload.token;
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
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },

    [signupUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [authenticateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authenticateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },

    [authenticateUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
    },

    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { updateUserInfo, logoutUser, deleteBook, addBook } =
  authSlice.actions;

export default authSlice.reducer;
