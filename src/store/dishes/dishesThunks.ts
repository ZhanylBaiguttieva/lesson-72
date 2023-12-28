import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, Dish, DishesList} from '../../types';

import {AppDispatch} from '../../app/store';
import axiosApi from '../../axiosApi';

export const fetchDishes = createAsyncThunk<Dish[], undefined, {dispatch: AppDispatch}>(
  'dishes/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<DishesList | null>('/dishes.json');
    const dishes = dishesResponse.data;

    let newDishes: Dish[] = [];
    if(dishes) {
      newDishes = Object.keys(dishes).map(key => {
        const dish = dishes[key];
        return {
          ...dish,
          id: key,
        };
      });
    }
    return newDishes;
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (dishId) => {
    await axiosApi.delete('/dishes/' + dishId + '.json');
  }
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async(dish) => {
    await axiosApi.post('/dishes.json', dish);
  }
);

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  'dishes/fetchOne',
  async(dishId) => {
    const response = await axiosApi.get<ApiDish | null>('/dishes/' + dishId + '.json');
    const dish = response.data;

    if(dish === null) {
      throw new Error('Not found');
    }

    return dish;
  }
);

interface UpdateDishParams {
  id: string,
  dish: ApiDish,
}
export const updateDish = createAsyncThunk<void,UpdateDishParams>(
  'dishes/update',
  async({id, dish}) => {
    await axiosApi.put('/dishes/' + id + '.json', dish);
  }
);