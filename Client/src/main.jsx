import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AdminLayout from './Admin/AdminLayout.jsx';
import DashBoard from './Admin/DashBoard.jsx';
import AdProduct from './Admin/AdProduct.jsx';
import UserList from './Admin/UserList.jsx';
import Settings from './Admin/Settings.jsx';
import Register from './User/Register.jsx';
import Login from './User/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/admin' element={<AdminLayout />} >
          <Route path='/admin' element={<DashBoard />} />
          <Route path='/admin/products' element={<AdProduct />} />
          <Route path='/admin/users' element={<UserList />} />
          <Route path='/admin/setting' element={<Settings />} />
      </Route>

      <Route path='/register' element={<Register />} />
      <Route path='/userlogin' element={<Login />} />
 
    </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)
