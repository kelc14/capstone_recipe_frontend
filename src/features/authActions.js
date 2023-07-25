import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import WhiskApi from "../api/api";

const backendURL = "https://whisk-backend-kelc14.onrender.com";

/** Authenticates user via login crendentials
 *
 * {username, password} => {user: {username, firstName, lastName, email, isAdmin}, token}
 *
 * sets localStorage userToken
 */

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/auth/login`,
        { username, password },
        config
      );
      localStorage.setItem("userToken", res.data.token);
      WhiskApi.token = res.data.token;

      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      const result = await axios.get(`${backendURL}/user/${username}`, config);

      let user = result.data.user;
      let token = res.data.token;
      return { user, token };
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.error.message) {
        return rejectWithValue(error.response.data.error.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** Creates user via input crendentials
 *
 * {username, password, firstName, lastName, email} => {user: {username, firstName, lastName, email, isAdmin}, token}
 *
 * sets localStorage userToken
 *
 */

export const signupUser = createAsyncThunk(
  "auth/register",
  async (
    { username, password, firstName, lastName, email },
    { rejectWithValue }
  ) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/auth/register`,
        { username, password, firstName, lastName, email },
        config
      );
      localStorage.setItem("userToken", res.data.token);

      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      const result = await axios.get(`${backendURL}/user/${username}`, config);

      return result.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.error.message) {
        return rejectWithValue(error.response.data.error.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** authenticates user
 *
 * Given username and passwords, requests user info from backend
 *
 */

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

      return { user: res.data.user, token };
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.error.message) {
        return rejectWithValue(error.response.data.error.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** Updates user information by sending to the backend
 *
 * {username, firstName, lastName, email } => {userInfo}
 */

export const updateUser = createAsyncThunk(
  "user/:username",
  async ({ username, firstName, lastName, email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };

      const res = await axios.patch(
        `${backendURL}/user/${username}`,
        { firstName, lastName, email },
        config
      );

      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.error.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
