import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cartSlice from "./cartSlice.js";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
  },
});

export default store;
