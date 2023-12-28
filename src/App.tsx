import './App.css';
import {Route, Routes} from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Dishes from './components/Dishes/Dishes';
import NewDish from './components/NewDish/NewDish';
import EditDish from './components/EditDish/EditDish';
import Client from './containers/Client/Client';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Client />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dishes" element={(<Dishes/>)} />
      <Route path="/admin/new-dish" element={(<NewDish/>)} />
      <Route path="/admin/edit-dish/:id" element={<EditDish/>} />
    </Routes>
  );
}

export default App;
