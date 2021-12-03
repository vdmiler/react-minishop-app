import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   size: [
      'L',

   ],
   color: []
}

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      setSearchValue(state, action) {
         state.searchValue = action.payload;
      },
   }
})

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;