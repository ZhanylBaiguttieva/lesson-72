import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteDishLoading, selectDishes, selectFetchDishLoading} from '../../store/dishes/dishesSlice';
import React, {useEffect} from 'react';
import {deleteDish, fetchDishes} from '../../store/dishes/dishesThunks';
import Spinner from '../Spinners/Spinner';
import DishItem from './DishItem';
import {Dish} from '../../types';
import {NavLink} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Dishes: React.FC= () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);
  const dishesLoading = useAppSelector(selectFetchDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  const removeDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <div className="d-flex m-3">
        <h4>Dishes</h4>
        <div className='ms-auto'>
          <NavLink to="/admin/new-dish" className="btn btn-success">Add new dish</NavLink>
          <NavLink to="/admin/edit-dish/:id" className="nav-link"></NavLink>
        </div>
      </div>
      {dishesLoading ? <Spinner/> : dishes.map((dish: Dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          deleteLoading = {deleteLoading}
          onDelete={() => removeDish(dish.id)}
        />
      ))}
    </>
  );
};

export default Dishes;