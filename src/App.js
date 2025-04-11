import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoutes from './Services/ProtectedRoutes';
import Orders from './components/Orders';
import Medicalbill from './components/Medicalbill';
import Addproduct from './components/Addproduct';
import Editdata from './components/Editdata';
import Orderdetails from './components/Orderdetails';
import Allproductlist from './components/Allproductlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/bill' element={<Medicalbill />} />
        <Route path='/editdata' element={<Editdata />} />
        <Route path='/orderdetails' element={<Orderdetails />} />
        <Route path='/allproductlist' element={<Allproductlist />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;