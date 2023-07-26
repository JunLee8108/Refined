import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const MEN_URL = process.env.PUBLIC_URL + "/db/men.json";

export const fetchMen = createAsyncThunk("men/fetchMen", async () => {
  const response = await axios.get(MEN_URL);
  return response.data;
});

const initialState = {
  men: [],
  status: "idle",
  error: null,
};

const menSlice = createSlice({
  name: "men",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMen.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMen.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.men = action.payload;
      })
      .addCase(fetchMen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectMen = (state) => state.men.men;
export const getMenStatus = (state) => state.men.status;
export const getMenError = (state) => state.men.error;

export default menSlice.reducer;
