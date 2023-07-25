import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const API_URL = "http://localhost:5000/api/posts/";

import WhiskApi from "../api/api";

const initialState = {
  calendar: [],
  loading: false,
};

/** Async Functions for Calendar:
 * - Get Calendar for user (username)
 */

// Get Recipes: () => [all recipes]
export const getCalendar = createAsyncThunk(
  // 1. action type string
  "calendar/getCalendar",
  // 2. callback function
  async ({ username }, { rejectWithValue }) => {
    return await WhiskApi.getCalendar(username);
  }
);

// // Get Recipes: () => [all recipes]
// export const getMoreRecipes = createAsyncThunk(
//   // 1. action type string
//   "recipes/getRecipes",
//   // 2. callback function
//   async (thunkAPI) => {
//     return await WhiskApi.getRandomRecipes();
//   }
// );

// // Add Post: (post) => {post}
// export const addPost = createAsyncThunk(
//   // 1. action type string
//   "posts/addPost",
//   // 2. callback function
//   async (data, thunkAPI) => {
//     const res = await axios.post(API_URL, data);
//     return res.data;
//   }
// );

// slice
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: {
    [getCalendar.pending]: (state) => {
      state.loading = true;
    },
    [getCalendar.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.calendar = payload;
    },
    [getCalendar.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default calendarSlice.reducer;
