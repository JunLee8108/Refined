import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
};

const searchSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    changeSearchData(state, a) {
      state.searchData = [...state.searchData, ...a.payload];
    },
  },
});

export const changeSearchData = (state) => state.searchData.searchData;
export default searchSlice.reducer;
