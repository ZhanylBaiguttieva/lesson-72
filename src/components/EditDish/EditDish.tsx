import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDish, selectFetchOneDishLoading, selectUpdateDishLoading} from '../../store/dishes/dishesSlice';
import React, {useEffect} from 'react';
import {fetchOneDish, updateDish} from '../../store/dishes/dishesThunks';
import {ApiDish} from '../../types';
import Spinner from '../Spinners/Spinner';
import DishForm from '../DishForm/DishForm';

const EditDish: React.FC = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dish = useAppSelector(selectDish);
  const fetchLoading = useAppSelector(selectFetchOneDishLoading);
  const updateDishLoading = useAppSelector(selectUpdateDishLoading);

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(updateDish({id,dish}));
    navigate('/admin/dishes');
  };

  const existingDish = dish ? {
    ...dish,
    price: dish.price.toString(),
  } : undefined;

  let formSection = <Spinner/>;

  if(!fetchLoading) {
    if(dish) {
      formSection = (
        <DishForm
          isEdit
          onSubmit={onSubmit}
          existingDish={existingDish}
          isLoading={updateDishLoading}/>
      );
    } else {
      formSection = <h4>Not found</h4>;
    }
  }

  return (
    <div className="row mt-2">
      <div className="col">
        {formSection}
      </div>
    </div>
  );
};

export default EditDish;