/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './ProductsPagination.scss';
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModifiedProductData } from '../../store/slices/productDataSlice';
import { setCurrentPage } from '../../store/slices/paginationSlice';

const ProductsPagination = () => {
   const dispatch = useDispatch();
   const { originProductData } = useSelector(state => state.productData);
   const { currentPage, productsPerPage } = useSelector(state => state.pagination)

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = originProductData.slice(indexOfFirstProduct, indexOfLastProduct);

   useEffect(() => {
      dispatch(setModifiedProductData(currentProducts))
   }, [currentPage])

   const paginatePage = pageNumber => {
      dispatch(setCurrentPage(pageNumber))
   }

   const totalPages = Math.ceil(originProductData.length / productsPerPage);
   return (
      <div>
         <Pagination
            variant="outlined"
            color="primary"
            count={totalPages}
            page={currentPage}
            onChange={(_, num) => paginatePage(num)}
            sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
         />
      </div>
   );
}

export default ProductsPagination;