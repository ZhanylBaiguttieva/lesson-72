import './App.css';
import {Route, Routes} from 'react-router-dom';
import Admin from './components/Admin';

function App() {

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
