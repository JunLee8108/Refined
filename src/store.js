import { configureStore, createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    {
      id: 0,
      name: "",
      color: "",
      size: "",
      price: "",
      count: 1,
    }
  ],
  reducers: {
    setCart(state) {
      return { name: "park", age: 20 };
    },
  },
});

export let { setCart } = cart.actions;

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
    cart: cart.reducer,
    wishlist: wishlist.reducer,
  },
});
