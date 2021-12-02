import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   orders: [],
   totalAmount: 0,
   isBasketShow: false,
   isNoticeShow: false,
}

const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      setOrders(state, action) {
         state.orders = action.payload
      },
      setTotalAmount(state, action) {
         state.totalAmount = action.payload
      },
      setBasketShow(state, action) {
         state.isBasketShow = action.payload
      },
      setNoticeShow(state, action) {
         state.isNoticeShow = action.payload
      }
   }
})

export const { setOrders, setTotalAmount, setBasketShow, setNoticeShow } = basketSlice.actions;

export default basketSlice.reducer;