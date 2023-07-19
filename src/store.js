import { configureStore, createSlice } from "@reduxjs/toolkit";

let wishlist = createSlice({
  name: "wishlist",
  initialState: [
    {
      id: 0,
      name: "",
      color: "",
      size: "",
      price: "",
      count: 1,
    },
  ],
  reducers: {
    setWishlist(state) {
      return { name: "park", age: 20 };
    },
  },
});

export let { setWishlist } = wishlist.actions;

export default configureStore({
  reducer: {
    wishlist: wishlist.reducer,
  },
});
