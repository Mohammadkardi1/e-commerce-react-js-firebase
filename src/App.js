import React from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from "./Components/Home";
import { AddProduct } from "./Components/AddProduct";
import {Login} from "./Components/Auth/Login"
import { Singup } from "./Components/Auth/Singup";
import { ForgetPassword } from "./Components/Auth/ForgetPassword";
import {Cart} from './Components/Cart'
import {Cashout} from './Components/Cashout'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Singup/>}/>
          <Route path="/forgetPassword" element={<ForgetPassword/>}/>
          <Route path="/cart-product" element={<Cart/>}/>
          <Route path='/cashout' element={<Cashout/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
