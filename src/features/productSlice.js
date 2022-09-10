import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    addProductToList: (state, action) => {
      //   state.productList.push({ ...action.payload });
      state.productList = action.payload;
    },
    addNewProduct: (state, action) => {
      state.productList.push({ ...action.payload });
      //   state.productList = action.payload;
    },
    addEditedProduct: (state, action) => {
      const editedList = state.productList.map(function (item) {
        return item._id == action.payload._id ? action.payload : item;
      });
      state.productList = editedList;
    },
  },
});

export default productSlice.reducer;

export const {
  setProductList,
  addProductToList,
  addNewProduct,
  addEditedProduct,
} = productSlice.actions;
