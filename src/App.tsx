import './App.css';
import {Route, Routes} from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Dishes from './components/Dishes/Dishes';
import NewDish from './components/NewDish/NewDish';
import EditDish from './components/EditDish/EditDish';

function App() {

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dishes" element={(<Dishes/>)} ></Route>
      <Route path="/admin/new-dish" element={(<NewDish/>)} ></Route>
      <Route path="/admin/edit-dish/:id" element={<EditDish/>}></Route>
    </Routes>
  );
}

export default App;
