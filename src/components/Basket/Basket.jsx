import React from 'react';
import './Basket.scss';
import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketShow } from '../../store/slices/basketSlice';
import BasketList from '../BasketList/BasketList';

const Basket = ({ orders = [], totalAmount }) => {
   const dispatch = useDispatch();
   const { isBasketShow } = useSelector(state => state.basket)
   return (
      <Drawer
         anchor="right"
         open={isBasketShow}
         onClose={() => dispatch(setBasketShow(false))}
      >
         <BasketList
            orders={orders}
            totalAmount={totalAmount}
         />
      </Drawer>
   );
}

export default Basket;