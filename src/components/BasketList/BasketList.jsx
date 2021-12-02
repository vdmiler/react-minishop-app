import React from 'react';
import './BasketList.scss';
import { ShoppingCart } from '@mui/icons-material';
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import BasketItem from '../BasketItem/BasketItem';
import { useDispatch } from 'react-redux';
import { setBasketShow, setOrders } from '../../store/slices/basketSlice';

const BasketList = ({ orders = [], totalAmount }) => {
   const dispatch = useDispatch();

   const plusQuantity = (itemId) => {
      const newOrder = orders.map((el) => {
         if (el.mainId === itemId) {
            const newQuantity = el.quantity + 1
            return {
               ...el,
               quantity: newQuantity
            }
         } else {
            return el
         }
      })
      dispatch(setOrders(newOrder));
   }

   const minusQuantity = (itemId) => {
      const newOrder = orders.map((el) => {
         if (el.mainId === itemId) {
            const newQuantity = el.quantity - 1
            return {
               ...el,
               quantity: newQuantity >= 1 ? newQuantity : 1
            }
         } else {
            return el
         }
      })
      dispatch(setOrders(newOrder));
   }

   const removeFromOrder = (itemId) => {
      const newOrder = orders.filter(elem => elem.mainId !== itemId);
      dispatch(setOrders(newOrder));
   }

   return (
      <List sx={{ width: '400px' }}>
         <ListItem>
            <ListItemIcon>
               <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Cart" />
         </ListItem>
         <Divider />
         {
            !orders.length ? (
               <ListItem>Корзина пуста</ListItem>
            ) : (
               <>
                  {orders.map(item => {
                     return (
                        <BasketItem
                           key={item.mainId}
                           {...item}
                           plusQuantity={plusQuantity}
                           minusQuantity={minusQuantity}
                           removeFromOrder={removeFromOrder}
                        />
                     )
                  })}
                  <Divider />
                  <ListItem>
                     <ListItemText sx={{ fontWeight: 700 }}>
                        <strong>Общая стоимость: {totalAmount} грн.</strong>
                     </ListItemText>
                  </ListItem>
                  <ListItem>
                     <Button
                        component={Link}
                        to="/checkout"
                        variant="outlined"
                        onClick={() => dispatch(setBasketShow(false))}
                     >
                        Оформить покупку
                     </Button>
                  </ListItem>
               </>
            )}
      </List>
   );
}

export default BasketList;