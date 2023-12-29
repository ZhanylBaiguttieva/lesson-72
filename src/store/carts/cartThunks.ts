import {createAsyncThunk} from '@reduxjs/toolkit';
import {Order} from '../../types';
import axiosApi from '../../axiosApi';

export const createOrder = createAsyncThunk<void, Order>(
  'cart/create',
  async(newOrders) => {
    await axiosApi.post('/orders.json', newOrders);
  }
);