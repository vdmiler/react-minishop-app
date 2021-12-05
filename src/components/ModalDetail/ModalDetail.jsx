import React, { useState } from 'react';
import './ModalDetail.scss';
import { Modal, FormControl, InputLabel, Select, MenuItem, Typography, Button, IconButton, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
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
      width: {
         xs: '290px',
         sm: '400px'
      },
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

   const [errorField, setErrorField] = useState(false);

   const handleSendToBasket = () => {
      if (clothingSize !== '') {
         addToBasket({
            mainId,
            displayName,
            finalPrice,
            clothingSize
         });
         setClothingSize('');
         setTimeout(() => {
            setActiveModal(false)
         }, 1500)
      } else {
         setErrorField(true)
      }
   }

   const handleChangeSize = e => {
      setClothingSize(e.target.value);
      if (e.target.value !== '') {
         setErrorField(false)
      } else {
         setErrorField(true)
      }
   }
   return (
      <Modal
         open={isActiveModal}
         onClose={() => setActiveModal(false)}
         aria-labelledby={displayName}
         aria-describedby={displayDescription}
      >
         <Card sx={style}>
            <IconButton
               sx={{
                  color: '#000',
                  position: 'absolute',
                  top: '-2px',
                  right: '-1px',
                  '&:hover': {
                     backgroundColor: 'transparent'
                  }
               }}
               onClick={() => setActiveModal(false)}
            >
               <CloseIcon />
            </IconButton>
            <CardMedia
               component="img"
               alt="green iguana"
               height="auto"
               image={imageUrl}
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  {displayName}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {displayDescription}
               </Typography>
               <Typography sx={{ mt: 2, mb: 2, fontSize: '18px' }}>
                  Цена: <span style={{ color: 'red' }}>{finalPrice} грн.</span>
               </Typography>
               <FormControl fullWidth error={errorField ? true : false}>
                  <InputLabel id="size-select-label">Размер:</InputLabel>
                  <Select
                     labelId="size-label"
                     id="size-select"
                     value={clothingSize}
                     label="Размер"
                     onChange={handleChangeSize}
                  >
                     <MenuItem value="M">M</MenuItem>
                     <MenuItem value="L">L</MenuItem>
                     <MenuItem value="XL">XL</MenuItem>
                     <MenuItem value="XXL">XXL</MenuItem>
                  </Select>
               </FormControl>
            </CardContent>
            <CardActions>
               <Button
                  variant="outlined"
                  size="medium"
                  color="success"
                  sx={{
                     mt: 4,
                     ml: 'auto',
                     mr: 'auto',
                     display: 'block'
                  }}
                  onClick={handleSendToBasket}
               >
                  В корзину
               </Button>
            </CardActions>
         </Card>
      </Modal>
   );
}

export default ModalDetail;