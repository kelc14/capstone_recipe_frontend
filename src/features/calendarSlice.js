import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import WhiskApi from "../api/api";

const initialState = {
  calendar: [],
  loading: false,
};

/** Async Functions for Calendar:
 * - Get Calendar for user (username)
 */

export const getCalendar = createAsyncThunk(
  // 1. action type string
  "calendar/getCalendar",
  // 2. callback function
  async ({ username }, { rejectWithValue }) => {
    return await WhiskApi.getCalendar(username);
  }
);

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
