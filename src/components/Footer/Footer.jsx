import { Container, Grid, Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
   const footerLinks = {
      color: 'white',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      transition: 'all .5s ease',
      '&:hover': {
         color: 'white',
         borderColor: 'white'
      }
   }
   return (
      <footer className="footer" id="footer">
         <Box bgcolor="text.primary" color="whitesmoke" py={{ xs: 4, sm: 6 }}>
            <Container>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <Box textAlign="center">
                        <Typography
                           variant="p"
                           component={Link}
                           to="/"
                           sx={footerLinks}
                        >
                           Support
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Box textAlign="center">
                        <Typography
                           variant="p"
                           component={Link}
                           to="/"
                           sx={footerLinks}
                        >
                           Login
                        </Typography>
                     </Box>
                  </Grid>
               </Grid>
            </Container>
            <Box textAlign="center" sx={{ mt: 2 }}>
               Material UI
            </Box>
         </Box>
      </footer>
   );
}

export default Footer;