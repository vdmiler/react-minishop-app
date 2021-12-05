import React from 'react';
import './Header.scss';
import { AppBar, Container, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { setBasketShow } from '../../store/slices/basketSlice';
import { Link } from 'react-router-dom';

const Header = ({ quantity }) => {
   const location = useLocation();
   const dispatch = useDispatch();
   return (
      <AppBar position="fixed">
         <Container fixed>
            <Toolbar>
               <Typography
                  variant="h6"
                  component={Link}
                  sx={{
                     flexGrow: 1,
                     textDecoration: 'none',
                     color: 'white'
                  }}
                  to="/"
               >
                  Mini Market
               </Typography>
               {
                  location.pathname === '/' ? (
                     <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => dispatch(setBasketShow(true))}
                     >
                        <Badge
                           color="secondary"
                           badgeContent={quantity}
                        >
                           <ShoppingCart />
                        </Badge>
                     </IconButton>
                  ) : null
               }
            </Toolbar>
         </Container>
      </AppBar>
   );
}

export default Header;