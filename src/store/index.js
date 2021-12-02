import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import paginationReducer from "./slices/paginationSlice";
import productDataReducer from "./slices/productDataSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
   reducer: {
      productData: productDataReducer,
      basket: basketReducer,
      pagination: paginationReducer,
      search: searchReducer,
   }
})

export default store;