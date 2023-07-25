import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:3001";

export const getBookDetails = createAsyncThunk(
  "book/:id",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log("did this run");
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
      console.log("data", data);
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
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
