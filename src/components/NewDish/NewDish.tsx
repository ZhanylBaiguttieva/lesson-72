import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateDishLoading} from '../../store/dishes/dishesSlice';
import {ApiDish} from '../../types';
import {createDish} from '../../store/dishes/dishesThunks';
import React from 'react';
import DishForm from '../DishForm/DishForm';

const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateDishLoading);

  const onSubmit = (dish:ApiDish) => {
    dispatch(createDish(dish));
    navigate('/admin/dishes');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={onSubmit} isLoading={createLoading}/>
      </div>
    </div>
  );
};

export default NewDish;