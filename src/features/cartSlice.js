import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      state.total += Number(action.payload.product.price) * 1;
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.product._id !== action.payload.product._id
      );
      state.cart = removeItem;
      state.total -=
        Number(action.payload.product.price) * Number(action.payload.quantity);
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  resetCart,
} = cartSlice.actions;
