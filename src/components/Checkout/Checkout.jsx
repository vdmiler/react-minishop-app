import React from 'react';
import './Checkout.scss';
import * as yup from 'yup';
import { Button, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import RedeemIcon from '@mui/icons-material/Redeem';

const Checkout = ({ orders = [], totalAmount }) => {
   const navigate = useNavigate();
   const goBack = () => navigate(-1);
   const checkoutValidationSchema = yup.object({
      name: yup
         .string()
         .min(2, 'Минимум 2 символа')
         .max(20, 'Максимум 20 символов')
         .required('Обязательное поле'),
      surname: yup
         .string()
         .min(2, 'Минимум 2 символа')
         .max(20, 'Максимум 20 символов')
         .required('Обязательное поле'),
      email: yup
         .string()
         .email('Неверный адрес электронной почты"')
         .required('Обязательное поле'),
   });

   const checkoutInitialValues = {
      name: '',
      surname: '',
      email: '',
   }

   const CheckoutForm = () => {
      const formik = useFormik({
         initialValues: checkoutInitialValues,
         validationSchema: checkoutValidationSchema,
         onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
         },
      });
      return (
         <div>
            <form className="checkout__form" onSubmit={formik.handleSubmit} style={{
               display: 'flex',
               justifyContent: 'space-between'
            }}>
               <div className="checkout__fields" style={{
                  flexBasis: '50%'
               }}>
                  <Typography className="checkout__title" variant="h5" component="h2">
                     Контактная информация
                  </Typography>
                  <div className="checkout__input">
                     <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Имя"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                     />
                  </div>
                  <div className="checkout__input">
                     <TextField
                        fullWidth
                        id="surname"
                        name="surname"
                        label="Фамилия"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                     />
                  </div>
                  <div className="checkout__input">
                     <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                     />
                  </div>
               </div>
               <div className="checkout__check" style={{
                  flexBasis: '40%'
               }}>
                  <Typography className="checkout__title" variant="h5" component="h2">
                     Оформление заказа
                  </Typography>
                  <List>
                     {
                        orders.map(order => {
                           return (
                              <ListItem key={order.mainId}>
                                 <ListItemIcon>
                                    <RedeemIcon />
                                 </ListItemIcon>
                                 <ListItemText>
                                    {order.displayName} X {order.quantity}
                                 </ListItemText>
                              </ListItem>
                           )
                        })
                     }
                     <ListItem>
                        <ListItemText>
                           <strong>Всего: {totalAmount}</strong>
                        </ListItemText>
                     </ListItem>
                  </List>
                  <Button className="checkout__btn" color="primary" variant="contained" fullWidth type="submit">
                     Оформить заказ
                  </Button>
               </div>
            </form>
         </div>
      );
   }

   return (
      <>
         <Typography variant="h4" component="h1" sx={{ mb: 8 }}>
            Оформление заказа
         </Typography>
         {CheckoutForm()}
         <Button
            variant="outlined"
            onClick={goBack}
            sx={{ mt: 8 }}
         >
            Назад
         </Button>
      </>
   );
}

export default Checkout;