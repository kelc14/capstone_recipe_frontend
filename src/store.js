import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import recipesReducer from "./features/recipesSlice";
import bookReducer from "./features/bookSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    book: bookReducer,
  },
});

export default store;
