
import {ToastContainer} from 'react-toastify'
import Login from './pages/Login';
import Inventario from './pages/Inventario';
import NotFound from './pages/NotFound';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Transacciones from './pages/Transacciones';
import Administracion from './pages/Administracion';
import HistorialdeVentas from './pages/HistorialdeVentas';
import PrivateRoute from './pages/PrivateRoute';
import PDF from './pages/PDF';
import Arqueo from './pages/Arqueo';

function App() {

  

  return (
    
    <>
    <BrowserRouter>

      <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/pdf' element={<PDF/>}/>
    <Route path='*' element={<NotFound/>}/>
    <Route element={<PrivateRoute/>}>
    <Route element={<MainLayout/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/inventario' element={<Inventario/>}/>
      <Route path='/ventas' element={<Transacciones/>}/>
      <Route path='/administracion' element={<Administracion/>}/>
      <Route path='/hventas' element={<HistorialdeVentas/>}/>
      <Route path='/arqueo' element={<Arqueo/>}/>
    </Route>
    </Route>
      </Routes>
    <ToastContainer/>
    </BrowserRouter>
    </>
  );
}

export default App;
