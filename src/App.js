/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router';
import './App.scss';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from './store/slices/productDataSlice';
import { setOrders, setTotalAmount } from './store/slices/basketSlice';
import Thanks from './components/Thanks/Thanks';

const App = () => {
  const dispatch = useDispatch();
  const { orders, totalAmount } = useSelector(state => state.basket)
  const isInitialMount = useRef(true);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [])

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('orders'))
    if (localOrders !== null && localOrders.length > 0) {
      dispatch(setOrders(localOrders));
    }
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('orders', JSON.stringify(orders))
    }
  }, [orders])

  useEffect(() => {
    dispatch(setTotalAmount(orders.reduce((acc, item) => {
      return acc + item.finalPrice * item.quantity
    }, 0)));
  }, [orders])

  return (
    <>
      <Header quantity={orders.length} />
      <Container sx={{ pt: '120px', pb: '88px' }}>
        <Routes>
          <Route
            path="/"
            element={
              <Shop orders={orders} totalAmount={totalAmount} />
            }
          />
          <Route
            path="checkout"
            element={<Checkout orders={orders} totalAmount={totalAmount} />}
          />
          <Route
            path="checkout/thanks"
            element={<Thanks />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
