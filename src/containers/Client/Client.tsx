import Meats from '../Meats/Meats';
import {useAppSelector} from '../../app/hooks';
import {selectCartMeats} from '../../store/cartSlice';
import {useState} from 'react';
import CartMeats from '../Cart/CartMeats';
import Modal from '../Modal/Modal';


const Client = () => {
  const cartMeats = useAppSelector(selectCartMeats);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <header className="mb-3 fs-5 text-start">
        Turtle pizza
      </header>
      <div>
        <Meats/>
      </div>
      <button className="w-100 btn btn-primary" onClick={() => setShowModal(true)}>Checkout</button>
      <Modal show={showModal} title="Order confirmation" onClose={() => setShowModal(false)}>
        <div className="modal-body">
          <h4>Your order:</h4>
          <CartMeats cartMeats={cartMeats}/>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn btn-success">Order</button>
        </div>
      </Modal>
    </>
  );
};

export default Client;