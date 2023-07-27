import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ALL_URL = process.env.PUBLIC_URL + "/db/all.json";

export const fetchAll = createAsyncThunk("all/fetchAll", async () => {
  const response = await axios.get(ALL_URL);
  return response.data;
});

const initialState = {
  all: [],
  status: "idle",
  error: null,
};

const allSlice = createSlice({
  name: "all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all = action.payload;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAll = (state) => state.all.all;
export const getAllStatus = (state) => state.all.status;
export const getAllError = (state) => state.all.error;

export default allSlice.reducer;
