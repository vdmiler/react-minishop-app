import React from 'react';
import { LinearProgress } from '@mui/material';
import ProductList from '../ProductList/ProductList';
import ProductsPagination from '../ProductsPagination/ProductsPagination';
import SearchField from '../SearchField/SearchField';
import { useSelector } from 'react-redux';
import Basket from '../Basket/Basket';
import BasketNotice from '../BasketNotice/BasketNotice';
import { useLocation } from 'react-router';

const Shop = ({ orders, totalAmount }) => {
   const { searchValue } = useSelector(state => state.search);
   const { modifiedProductData, loadingProgress } = useSelector(state => state.productData);
   const location = useLocation();
   return (
      <>
         {
            loadingProgress ? <LinearProgress /> :
               (
                  <>
                     <SearchField />
                     {
                        modifiedProductData.length !== 0 ? <ProductList />
                           : <h3 style={{ textAlign: 'center' }}>Nothing not found</h3>
                     }
                     {
                        searchValue === '' ? <ProductsPagination />
                           : null
                     }
                  </>
               )
         }
         {
            location.pathname === '/' ?
               <>
                  <Basket
                     orders={orders}
                     totalAmount={totalAmount}
                  />
                  <BasketNotice />
               </>
               : null
         }
      </>
   );
}

export default Shop;