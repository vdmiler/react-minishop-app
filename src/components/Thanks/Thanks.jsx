import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const Thanks = () => {
   const navigate = useNavigate();
   const goHome = () => navigate('/', { replace: true });
   return (
      <>
         <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
            Спасибо за заказ приходите еще!
         </Typography>
         <Button
            variant="outlined"
            sx={{ margin: '20px auto 0 auto', display: 'block' }}
            onClick={goHome}
         >
            На главную
         </Button>
      </>
   );
}

export default Thanks;