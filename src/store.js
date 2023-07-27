import { configureStore, createSlice } from "@reduxjs/toolkit";
import menSlice from "./slices/menSlice";
import womenSlice from "./slices/womenSlice";
import accSlice from "./slices/accSlice";
import allSlice from "./slices/allSlice";
// import searchSlice from "./slices/searchSlice";

const initialState = {
  data: [],
};

const searchData = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    changeSearchData(state, a) {
      state.data = [...a.payload];
    },
  },
});

export let { changeSearchData } = searchData.actions;

const store = configureStore({
  reducer: {
    men: menSlice,
    women: womenSlice,
    acc: accSlice,
    all: allSlice,
    searchData: searchData.reducer,
  },
});

export default store;

// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// let wishlist = createSlice({
//   name: "wishlist",
//   initialState: [
//     {
//       id: 0,
//       name: "",
//       color: "",
//       size: "",
//       price: "",
//       count: 1,
//     },
//   ],
//   reducers: {
//     setWishlist(state) {
//       return { name: "park", age: 20 };
//     },
//   },
// });

// export let { setWishlist } = wishlist.actions;

// export default configureStore({
//   reducer: {
//     wishlist: wishlist.reducer,
//   },
// });
