import React from 'react';
import './BasketItem.scss';
import { Close } from '@mui/icons-material';
import { Button, IconButton, ListItem, ListItemText } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const BasketItem = ({
   mainId,
   displayName,
   finalPrice,
   clothingSize,
   quantity,
   plusQuantity = () => { },
   minusQuantity = () => { },
   removeFromOrder = () => { }
}) => {
   return (
      <ListItem>
         <ListItemText
            sx={{
               flexBasis: '200px',
            }}
         >
            {displayName} <strong>{finalPrice} грн. x 1</strong> ({clothingSize})

         </ListItemText>
         <ListItemText
            sx={{
               flexDirection: 'column',
               justifyContent: 'center',
               flexShrink: 0,
            }}
         >
            <Button onClick={() => minusQuantity(mainId)}><RemoveCircleOutlineOutlinedIcon /></Button>
            <span>{quantity}</span>
            <Button onClick={() => plusQuantity(mainId)}><AddCircleOutlineOutlinedIcon /></Button>
         </ListItemText>
         <IconButton
            onClick={() => removeFromOrder(mainId)}
         >
            <Close />
         </IconButton>
      </ListItem>
   );
}

export default BasketItem;