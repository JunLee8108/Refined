import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const WOMEN_URL = process.env.PUBLIC_URL + "/db/women.json";

export const fetchWomen = createAsyncThunk("women/fetchWomen", async () => {
  const response = await axios.get(WOMEN_URL);
  return response.data;
});

const initialState = {
  women: [],
  status: "idle",
  error: null,
};

const womenSlice = createSlice({
  name: "women",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomen.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWomen.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.women = action.payload;
      })
      .addCase(fetchWomen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectWomen = (state) => state.women.women;
export const getWomenStatus = (state) => state.women.status;
export const getWomenError = (state) => state.women.error;

export default womenSlice.reducer;
