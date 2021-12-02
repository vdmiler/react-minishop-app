import React from 'react';
import './SearchField.scss';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModifiedProductData } from '../../store/slices/productDataSlice';
import { setSearchValue } from '../../store/slices/searchSlice';

const SearchField = () => {
   const dispatch = useDispatch();
   const { originProductData } = useSelector(state => state.productData)
   const { searchValue } = useSelector(state => state.search);

   const handleSearch = value => {
      if (!value) {
         dispatch(setModifiedProductData(originProductData));
         dispatch(setSearchValue(''))
         return;
      }
      dispatch(setSearchValue(value));
      dispatch(setModifiedProductData(
         originProductData.filter(product => {
            return product.displayName.toLowerCase().includes(value.toLowerCase())
         })
      ));
   }
   return (
      <>
         <TextField
            label='Умный поиск...'
            variant="outlined"
            fullWidth
            type='search'
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
               mb: '1.5rem'
            }}
         />
      </>
   );
}

export default SearchField;