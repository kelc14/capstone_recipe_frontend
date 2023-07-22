import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const API_URL = "http://localhost:5000/api/posts/";

import WhiskApi from "../api/api";

const initialState = {
  recipes: [],
  loading: false,
};

/** Async Functions for Comments:
 * - Get Recipes (ALL)
 */

// Get Recipes: () => [all recipes]
export const getRecipes = createAsyncThunk(
  // 1. action type string
  "recipes/getRecipes",
  // 2. callback function
  async (thunkAPI) => {
    return await WhiskApi.getRandomRecipes();
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
export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.loading = true;
    },
    [getRecipes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.recipes = payload;
    },
    [getRecipes.rejected]: (state) => {
      state.loading = false;
    },
    // [getMoreRecipes.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getMoreRecipes.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.recipes = [...state.recipes, ...payload];
    // },
    // [getMoreRecipes.rejected]: (state) => {
    //   state.loading = false;
    // },
    // [addPost.pending]: (state) => {
    //   state.loading = true;
    // },
    // [addPost.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.posts = [...state.posts, payload];
    // },
    // [addPost.rejected]: (state) => {
    //   state.loading = false;
    // },
  },
});

export default recipesSlice.reducer;
