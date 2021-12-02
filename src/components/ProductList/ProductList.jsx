import React from 'react';
import './ProductList.scss';
import ProductItem from '../ProductItem/ProductItem';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const ProductList = () => {
   const { modifiedProductData } = useSelector(state => state.productData)
   return (
      <>
         {
            modifiedProductData ? (
               <Grid container spacing={2}>
                  {
                     modifiedProductData.map(product => {
                        return (
                           <ProductItem key={product.mainId} {...product} />
                        )
                     })
                  }
               </Grid>
            ) : (
               <h3 style={{ textAlign: 'center' }}>Nothing here</h3>
            )
         }
      </>
   );
}

export default ProductList;