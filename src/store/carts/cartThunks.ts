import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiOrder, Order} from '../../types';
import axiosApi from '../../axiosApi';
import {AppDispatch} from '../../app/store';

export const createOrder = createAsyncThunk<void, Order>(
  'cart/create',
  async(newOrders) => {
    await axiosApi.post('/orders.json', newOrders);
  }
);

// export const fetchOrders = createAsyncThunk<ApiOrder[], undefined, {dispatch: AppDispatch}>(
//   'orders/fetchAll',
//   async () => {
//     const ordersResponse = await axiosApi.get('/orders.json');
//     const orders: Order[] = ordersResponse.data;
//
//     let newOrders: ApiOrder[] = [];
//     if(orders) {
//       newOrders = Object.entries(orders).map(entry => {
//         const id = entry[0];
//         const order = entry[1];
//         const dishes = Object.keys(order).map(async(dishKey) => {
//           const dishesResponse = await axiosApi.get('/dishes/' + dishKey + '.json');
//           const dishesOrders = dishesResponse.data;
//           return {
//             title: dishesOrders.title,
//             image: dishesOrders.image,
//             price: dishesOrders.price,
//           };
//         });
//
//         return {
//           id: id,
//           dishes: dishes
//         };
//       });
//     }
//     return newOrders;
//   }
// );

export const fetchOrders = createAsyncThunk<ApiOrder[], undefined, { dispatch: AppDispatch }>(
  'orders/fetchAll',
  async () => {
    try {
      const ordersResponse = await axiosApi.get('/orders.json');
      const orders: Order[] = ordersResponse.data;

      let newOrders: ApiOrder[] = [];

      if (orders) {
        newOrders = await Promise.all(
          Object.entries(orders).map(async (entry) => {
            const id = entry[0];
            const order = entry[1];
            const dishes: ApiDish[] = await Promise.all(
              Object.keys(order).map(async (dishKey) => {
                const dishesResponse = await axiosApi.get('/dishes/' + dishKey + '.json');
                const dishesOrders = dishesResponse.data;
                return {
                  title: dishesOrders.title,
                  image: dishesOrders.image,
                  price: dishesOrders.price,
                };
              })
            );

            return {
              id: id,
              dishes: dishes,
            };
          })
        );
      }

      return newOrders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error; // Propagate the error so it can be caught by the component or Redux middleware
    }
  }
);