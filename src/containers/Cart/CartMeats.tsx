import {CartMeat} from '../../types';
import React from 'react';
import CartItem from './CartItem';
// import {DELIVERY} from '../../constants';

interface Props {
  cartMeats: CartMeat[];
  // delivery: typeof DELIVERY;
}

const CartMeats: React.FC<Props> = ({cartMeats}) => {
  const deliveryCost = 150;
  const total = cartMeats.reduce((sum, cartMeat) => {
    return sum + cartMeat.amount * cartMeat.meat.price;
  }, 0) + deliveryCost;

  return (
    <>
      {cartMeats.map((cartMeat) => (
        <CartItem key={cartMeat.meat.id} cartMeat={cartMeat}/>
      ))}
      <div className="card border-0 p-2">
        <div className="text-end"> Delivery costs: <strong>{deliveryCost}</strong> KGS</div>
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