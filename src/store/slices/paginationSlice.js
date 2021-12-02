import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   currentPage: 1,
   productsPerPage: 12,
}

const paginationSlice = createSlice({
   name: 'pagination',
   initialState,
   reducers: {
      setCurrentPage(state, action) {
         state.currentPage = action.payload;
      },
      setProductsPerPage(state, action) {
         state.productsPerPage = action.payload;
      }
   }
})

export const { setCurrentPage, setProductsPerPage } = paginationSlice.actions;

export default paginationSlice.reducer;