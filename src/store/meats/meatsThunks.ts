import {createAsyncThunk} from '@reduxjs/toolkit';
import {Dish, DishesList} from '../../types';
import {AppDispatch} from '../../app/store';
import axiosApi from '../../axiosApi';
import {updateCart} from '../cartSlice';

export const fetchMeats = createAsyncThunk<Dish[], undefined, {dispatch: AppDispatch}>(
  'meats/fetchAll',
  async (_, thunkAPI) => {
    const meatsResponse = await axiosApi.get<DishesList | null>('/dishes.json');
    const meats = meatsResponse.data;

    let newMeats: Dish[] = [];
    if(meats) {
      newMeats = Object.keys(meats).map(key => {
        const meat = meats[key];
        return {
          ...meat,
          id: key,
        };
      });
    }
    thunkAPI.dispatch(updateCart(newMeats));
    return newMeats;
  }
);