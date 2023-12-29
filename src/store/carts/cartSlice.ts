import {ApiOrder, CartMeat, Dish} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createOrder, fetchOrders} from './cartThunks';

interface CartState {
  cartMeats: CartMeat[];
  items: ApiOrder[];
  // cartMeat: CartMeat | null;
  createLoading: boolean;
  fetchLoading: boolean;
}

const initialState: CartState = {
  cartMeats:[],
  items: [],
  // cartMeat: null,
  createLoading: false,
  fetchLoading: false,
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
  },
  extraReducers:(builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createOrder.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createOrder.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchOrders.fulfilled, (state,{payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });

    builder.addCase(fetchOrders.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});
export const cartReducer = cartSlice.reducer;
export const {addMeat, removeMeat, clearCart, updateCart} = cartSlice.actions;
export const selectCartMeats = (state:RootState) => state.cart.cartMeats;
export const selectOrders = (state: RootState) => state.cart.items;

export const selectFetchOrdersLoading  = (state: RootState) => state.cart.fetchLoading;
// export const selectCartMeat = (state: RootState) => state.cart.cartMeat;