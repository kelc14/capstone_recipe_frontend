import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:3001";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/auth/login`,
        { username, password },
        config
      );
      //   console.log(res.data.token, "token");
      localStorage.setItem("userToken", res.data.token);
      return res.data;
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

export const signupUser = createAsyncThunk(
  "auth/register",
  async (
    { username, password, firstName, lastName, email },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/auth/register`,
        { username, password, firstName, lastName, email },
        config
      );
      //   console.log(res.data.token, "token");

      localStorage.setItem("userToken", res.data.token);
      return res.data;
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

export const authenticateUser = createAsyncThunk(
  "user/:username",
  async ({ username, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(`${backendURL}/user/${username}`, config);
      console.log(res.data, "from api backend");

      return { user: res.data.user, token };
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
