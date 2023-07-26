import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ACC_URL = process.env.PUBLIC_URL + "/db/acc.json";

export const fetchAcc = createAsyncThunk("acc/fetchAcc", async () => {
  const response = await axios.get(ACC_URL);
  return response.data;
});

const initialState = {
  acc: [],
  status: "idle",
  error: null,
};

const accSlice = createSlice({
  name: "acc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAcc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.acc = action.payload;
      })
      .addCase(fetchAcc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAcc = (state) => state.acc.acc;
export const getAccStatus = (state) => state.acc.status;
export const getAccError = (state) => state.acc.error;

export default accSlice.reducer;
