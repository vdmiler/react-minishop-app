import React from 'react';
import './ModalDetail.scss';
import { Modal, Box, FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setNoticeShow, setOrders } from '../../store/slices/basketSlice';

const ModalDetail = ({
   mainId,
   imageUrl,
   displayName,
   displayDescription,
   finalPrice,
   isActiveModal,
   setActiveModal,
   clothingSize,
   setClothingSize
}) => {
   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 400,
      width: '100%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };

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

   return (
      <Modal
         open={isActiveModal}
         onClose={() => setActiveModal(false)}
         aria-labelledby={displayName}
         aria-describedby={displayDescription}
      >
         <Box sx={style}>
            <Typography variant="h6" component="h2">
               {displayName}
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
               {displayDescription}
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
               <img src={imageUrl} alt="" style={{ width: '360px', height: 'auto' }} />
            </Box>
            <Typography sx={{ mt: 2 }}>
               Цена: {finalPrice}
            </Typography>
            <Box sx={{ maxWidth: 100, mt: 2 }}>
               <FormControl fullWidth>
                  <InputLabel id="size-select-label">Размер:</InputLabel>
                  <Select
                     labelId="size-label"
                     id="size-select"
                     value={clothingSize}
                     label="Размер"
                     onChange={e => setClothingSize(e.target.value)}
                  >
                     <MenuItem value="M">M</MenuItem>
                     <MenuItem value="L">L</MenuItem>
                     <MenuItem value="XL">XL</MenuItem>
                     <MenuItem value="XXL">XXL</MenuItem>
                  </Select>
               </FormControl>
            </Box>
            <Button
               variant="outlined"
               size="medium"
               color="success"
               sx={{ mt: 4 }}
               onClick={() => addToBasket({
                  mainId,
                  displayName,
                  finalPrice,
                  clothingSize
               })}>В корзину</Button>
         </Box>
      </Modal>
   );
}

export default ModalDetail;