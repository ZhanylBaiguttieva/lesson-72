import {configureStore} from '@reduxjs/toolkit';
import {dishesReducer} from '../store/dishes/dishesSlice';
import {cartReducer} from '../store/cartSlice';
import {meatsReducer} from '../store/meats/meatsSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    dishes: dishesReducer,
    meats: meatsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;