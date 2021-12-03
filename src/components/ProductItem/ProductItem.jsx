import React, { useState } from 'react';
import './ProductItem.scss';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import ModalDetail from '../ModalDetail/ModalDetail';

const ProductItem = (props) => {
   const { mainId, granted, displayName, price, displayDescription } = props;

   const imageUrl = granted[0].images.full_background;
   const finalPrice = price.finalPrice;

   const [isActiveModal, setActiveModal] = useState(false);
   const [clothingSize, setClothingSize] = useState('');
   return (
      <>
         <Grid item xs={12} md={4}>
            <Card sx={{
               maxWidth: 345,
               height: '100%',
               margin: '0 auto'
            }}
            >
               <CardMedia
                  component="img"
                  height="auto"
                  image={imageUrl}
                  alt="green iguana"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setActiveModal(true)}
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
                     onClick={() => setActiveModal(true)}
                  >
                     Выбрать
                  </Button>
               </CardActions>
            </Card>
         </Grid>
         <ModalDetail
            mainId={mainId}
            imageUrl={imageUrl}
            displayName={displayName}
            displayDescription={displayDescription}
            finalPrice={finalPrice}
            isActiveModal={isActiveModal}
            setActiveModal={setActiveModal}
            clothingSize={clothingSize}
            setClothingSize={setClothingSize}
         />
      </>
   );
}

export default ProductItem;