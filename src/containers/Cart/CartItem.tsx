import {CartMeat} from '../../types';
import React from 'react';
import {removeMeat} from '../../store/carts/cartSlice';
import {useAppDispatch} from '../../app/hooks';

interface Props {
  cartMeat: CartMeat;
}

const CartItem: React.FC<Props> = ({cartMeat}) => {
  const price = cartMeat.meat.price * cartMeat.amount;
  const dispatch = useAppDispatch();
  const removeFromCart  = () => {
    dispatch(removeMeat(cartMeat.meat));
  };
  return (
    <div className="card mb-2 p-2">
      <div className="row align-items-center">
        <p className="col">{cartMeat.meat.title}</p>
        <p className="col">x{cartMeat.amount}</p>
        <p className="col">
          {price} KGS
        </p>
        <div className="col">
          <button className='btn btn-danger' onClick={removeFromCart}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;