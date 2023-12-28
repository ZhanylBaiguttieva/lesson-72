import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import Spinner from '../../components/Spinners/Spinner';
import {Dish} from '../../types';
import {selectFetchMeatLoading, selectMeats} from '../../store/meats/meatsSlice';
import {fetchMeats} from '../../store/meats/meatsThunks';
import MeatItem from './MeatItem';

const Meats: React.FC= () => {
  const dispatch = useAppDispatch();
  const meats = useAppSelector(selectMeats);
  const meatsLoading = useAppSelector(selectFetchMeatLoading);

  useEffect(() => {
    dispatch(fetchMeats());
  }, [dispatch]);

  return (
    <div>
      {meatsLoading ? <Spinner/> : meats.map((meat: Dish) => (
        <MeatItem
          key={meat.id}
          meat={meat}
        />
      ))}
    </div>
  );
};

export default Meats;