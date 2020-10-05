import React from 'react';
import Header from './header/Header'
import Cart from './cart/Cart'

import './App.css';

function App() {
  let cartData = []
  
  
  return (
    <>
    <Header />
    <Cart cartProps= {cartData} />
    
    </>
  );
}

export default App;
