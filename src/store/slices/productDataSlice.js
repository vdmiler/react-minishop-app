import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "../../config";

export const fetchProductData = createAsyncThunk(
   'products/fetchProductData',
   async function () {
      try {
         const response = await axios.get(API_URL, {
            headers: {
               'Authorization': API_KEY
            }
         })
         const productData = await response.data.shop
         return productData;
      } catch (err) {
         console.error(err.response);
      }
   }
)

const initialState = {
   originProductData: [],
   modifiedProductData: [],
   loadingProgress: false,
   errorFetch: null,
}

const productDataSlice = createSlice({
   name: 'productData',
   initialState,
   reducers: {
      setOriginProductData(state, action) {
         state.originProductData = action.payload
      },
      setModifiedProductData(state, action) {
         state.modifiedProductData = action.payload
      }
   },
   extraReducers: {
      [fetchProductData.pending]: (state, action) => {
         state.loadingProgress = true;
      },
      [fetchProductData.fulfilled]: (state, action) => {
         state.loadingProgress = false;
         state.originProductData = action.payload;
         state.modifiedProductData = action.payload;
      },
      [fetchProductData.rejected]: (state, action) => {
         state.loadingProgress = false;
         state.errorFetch = action.payload;
      },
   }
});

export const { setOriginProductData, setModifiedProductData } = productDataSlice.actions;

export default productDataSlice.reducer;