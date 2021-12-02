import React from 'react';
import './ProductItem.scss';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNoticeShow, setOrders } from '../../store/slices/basketSlice';

const ProductItem = (props) => {

   const { mainId, granted, displayName, price, displayDescription } = props;

   const dispatch = useDispatch();
   const { orders } = useSelector(state => state.basket);

   const addToBasket = (item) => {
      const itemIndex = orders.findIndex(orderItem => orderItem.mainId === item.mainId)
      if (itemIndex < 0) {
         const newItem = {
            ...item,
            quantity: 1
         }
         dispatch(setOrders([...orders, newItem]))
      } else {
         const newOrder = orders.map((orderItem, index) => {
            if (index === itemIndex) {
               return {
                  ...orderItem,
                  quantity: orderItem.quantity + 1
               }
            } else {
               return orderItem;
            }
         })
         dispatch(setOrders(newOrder))
      }
      dispatch(setNoticeShow(true))
   }

   const imageUrl = granted[0].images.full_background;
   const finalPrice = price.finalPrice;

   return (
      <Grid item xs={12} md={4}>
         <Card sx={{
            maxWidth: 345,
            height: '100%',
            margin: '0 auto'
         }}>
            <CardMedia
               component="img"
               height="auto"
               image={imageUrl}
               alt="green iguana"
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  {displayName}
               </Typography>
               <Typography variant="h6" component="div" sx={{ mb: 1, color: '#f44336' }}>
                  {finalPrice} грн.
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {displayDescription}
               </Typography>
            </CardContent>
            <CardActions>
               <Button
                  variant="outlined"
                  size="medium"
                  color="success"
                  sx={{ ml: 'auto' }}
                  onClick={() => addToBasket({
                     mainId,
                     displayName,
                     finalPrice,
                  })}>Купить</Button>
            </CardActions>
         </Card>
      </Grid>
   );
}

export default ProductItem;