import {CartMeat, Dish} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

interface CartState {
  cartMeats: CartMeat[];
}

const initialState: CartState = {
  cartMeats:[],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMeat: (state, {payload: meat}: PayloadAction<Dish>) => {
      const index = state.cartMeats.findIndex(cartMeat => cartMeat.meat.id === meat.id);

      if (index !== -1) {
        state.cartMeats[index].amount++;
      } else {
        state.cartMeats.push({
          amount: 1,
          meat,
        });
      }
    },
    removeMeat: (state, {payload: meat}: PayloadAction<Dish>) => {
      const index = state.cartMeats.findIndex(cartMeat => cartMeat.meat.id === meat.id);

      if (index !== -1) {
        state.cartMeats[index].amount--;
      }
    },
    updateCart: (state, {payload: meats}: PayloadAction<Dish[]>) => {
      const newCartMeats: CartMeat[] = [];

      state.cartMeats.forEach(cartMeat => {
        const existingMeat = meats.find(meat => meat.id === cartMeat.meat.id);
        if(!existingMeat) {
          return;
        }

        newCartMeats.push({
          ...cartMeat,
          meat: existingMeat,
        });
      });
      state.cartMeats = newCartMeats;
    },
    clearCart: (state) => {
      state.cartMeats = [];
    },
  }
});
export const cartReducer = cartSlice.reducer;
export const {addMeat, removeMeat, clearCart, updateCart} = cartSlice.actions;
export const selectCartMeats = (state:RootState) => state.cart.cartMeats;