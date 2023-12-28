import {ApiDish, Dish} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from './dishesThunks';
import {RootState} from '../../app/store';

interface DishesState {
  items: Dish[];
  dish: ApiDish | null;
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
}

const initialState: DishesState = {
  items: [],
  dish: null,
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
};


export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchDishes.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });

    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteDish.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });

    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
      state.fetchLoading = false;
    });

    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneLoading = true;
    });

    builder.addCase(fetchOneDish.fulfilled, (state, {payload: dish}: PayloadAction<ApiDish | null>) => {
      state.fetchOneLoading = false;
      state.dish = dish;
    });

    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });

    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });

  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectDish = (state: RootState) => state.dishes.dish;
export const selectFetchDishLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectCreateDishLoading = (state: RootState) => state.dishes.createLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const selectUpdateDishLoading = (state: RootState) => state.dishes.updateLoading;