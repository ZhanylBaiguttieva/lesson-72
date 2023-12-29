import React from 'react';
import {ApiOrder} from '../../types';
import {useAppSelector} from '../../app/hooks';
import {selectOrders} from '../../store/carts/cartSlice';
interface Props {
  order: ApiOrder;
}

const OrderItem: React.FC<Props> = ({order}) => {
  const orders = useAppSelector(selectOrders);
  // const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';

  // const image = dish.image || imageUrl;
  // const imageStyle = {
  //   background: `url(${image}) no-repeat center center / cover`,
  // };

  return (
    <div className="card mb-2">
      <div className="row no-gutters">
        {/*<div className="col-sm-4 rounded-start" style={imageStyle}/>*/}
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{order.id}</h5>
            <div>
              {order.dishes.map(newDish => {
                <p>{newDish.title}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;