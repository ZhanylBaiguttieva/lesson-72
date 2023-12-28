import {Dish} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchMeats} from './meatsThunks';
import {RootState} from '../../app/store';

interface MeatsState {
  data: Dish[];
  fetchLoading: boolean;
}

const initialState: MeatsState = {
  data: [],
  fetchLoading: false,
};

export const meatsSlice = createSlice({
  name: 'meats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeats.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchMeats.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.data = data;
    });

    builder.addCase(fetchMeats.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const meatsReducer = meatsSlice.reducer;

export const selectMeats = (state: RootState) => state.meats.data;
export const selectFetchMeatLoading = (state: RootState) => state.meats.fetchLoading;