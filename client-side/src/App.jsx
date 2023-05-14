// import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState , useEffect } from "react";
import jwtDecode from "jwt-decode";
import './App.css';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Navbar from './pages/Navbar';
import Product from './pages/Product';
import StripePayment from './components/StripePayment';
import Login from './pages/Login';
import Registration from './pages/Registration';
import MyProduct from './pages/MyProducts';
import AddProduct from './pages/addProduct';

function App ()
{
  let [loggedInUser, setloggedInUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      // console.log("there is user");

      let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
      let userData = jwtDecode(encodedToken);
      setloggedInUser(userData);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
       <Navbar loggedInUser={loggedInUser}/>
       <Routes>
        <Route path='/' element={<Product/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Registration/>} ></Route>
        <Route path='/myProducts' element={<MyProduct/>} ></Route>
        <Route path='/addProduct' element={<AddProduct/>} ></Route>
        <Route path='/cart' element={<Cart/>} ></Route>
        <Route path='/order' element={<Order/>} ></Route>
        <Route path='/payment' element={<StripePayment/>}></Route>
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
