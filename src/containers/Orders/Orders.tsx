import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import Spinner from '../../components/Spinners/Spinner';
import {selectFetchOrdersLoading, selectOrders} from '../../store/carts/cartSlice';
import {fetchOrders} from '../../store/carts/cartThunks';
import OrderItem from './OrderItem';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const ordersLoading = useAppSelector(selectFetchOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      {ordersLoading ? <Spinner/> : orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order.dishes}
        />
      ))}
    </div>
  );
};

export default Orders;