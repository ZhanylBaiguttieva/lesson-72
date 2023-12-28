import {Dish} from '../../types';
import React from 'react';
import {useAppDispatch} from '../../app/hooks';
import {addMeat} from '../../store/cartSlice';

interface Props {
  meat: Dish;
}

const MeatItem: React.FC<Props> = ({meat}) => {
  const dispatch = useAppDispatch();
  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';

  const image = meat.image || imageUrl;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`,
  };

  const addMeatToCart  = () => {
    dispatch(addMeat(meat));
  };
  return (
    <div className="card mb-2 w-50" onClick={addMeatToCart}>
      <div className="row no-gutters">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{meat.title}</h5>
            <p className="card-text">{meat.price} KGS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeatItem;