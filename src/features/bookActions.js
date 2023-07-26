import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "https://whisk-backend-kelc14.onrender.com";

/** Get book details from the backend
 *
 * {id} => {id, title, username, recipes: [...]}
 *
 */
export const getBookDetails = createAsyncThunk(
  "book/:id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      const res = await axios.get(
        `${backendURL}/book/${id}`,

        config
      );
      const data = await res.data;
      return data.book;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** Add New book to databse for user:
 * {title, username} = > {id, title, username, recipes: [...]}
 */
export const addNewBook = createAsyncThunk(
  "book",
  async ({ title, username }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      const res = await axios.post(
        `${backendURL}/book`,
        { title, username },
        config
      );
      return res.data.book;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
