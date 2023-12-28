import {CartMeat} from '../../types';
import React from 'react';
import CartItem from './CartItem';
import {useAppDispatch} from '../../app/hooks';
import {removeMeat} from '../../store/cartSlice';

interface Props {
  cartMeats: CartMeat[];
}

const CartMeats: React.FC<Props> = ({cartMeats}) => {
  const total = cartMeats.reduce((sum, cartMeat) => {
    return sum + cartMeat.amount * cartMeat.meat.price;
  }, 0);

  return (
    <>
      {cartMeats.map((cartMeat) => (
        <CartItem key={cartMeat.meat.id} cartMeat={cartMeat}/>
      ))}
      <div className="card border-0 p-2">
        <div className="row">
          <div className="col text-end">
            Total:
          </div>
          <div className="col-3 text-end">
            <strong>{total}</strong> KGS
          </div>
        </div>
      </div>
    </>
  );
};

export default CartMeats;