import React from 'react';
import './BasketNotice.scss';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNoticeShow } from '../../store/slices/basketSlice';

const BasketNotice = () => {
   const dispatch = useDispatch();
   const { isNoticeShow } = useSelector(state => state.basket);
   return (
      <div>
         <Snackbar
            open={isNoticeShow}
            onClose={() => dispatch(setNoticeShow(false))}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         >
            <Alert
               severity="info"
            >
               Товар добавлен в корзину!
            </Alert>
         </Snackbar>
      </div >
   );
}

export default BasketNotice;