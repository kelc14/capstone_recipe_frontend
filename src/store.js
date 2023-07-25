import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import recipesReducer from "./features/recipesSlice";
import bookReducer from "./features/bookSlice";
import calendarReducer from "./features/calendarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    book: bookReducer,
    calendar: calendarReducer,
  },
});

export default store;
