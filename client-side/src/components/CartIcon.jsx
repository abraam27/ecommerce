import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FiShoppingCart} from 'react-icons/fi';


const CartIcon = () => {

    const [totalQTY,totalQTYState] = useState(0);

    useEffect(()=>{
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      if (dataLocal!= null) {
        let totQ = dataLocal.reduce((x,y) => x+y.qty,0);
        totalQTYState(totQ);
        }
     },[]);
    
    window.addEventListener("storage",(e) => {
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      let totQ = dataLocal?.reduce((x,y) => x+y.qty,0);
      if (totQ) {
        totalQTYState(totQ);
      }else{
        totalQTYState(0);
      }
    });
  
  return (
    <>
    <div className="cart d-inline position-relative">
      <span ><Link to='/cart' className='text-white text-decoration-none'><FiShoppingCart className='cartColor' size='30px'/></Link></span>
      <span className="badeg bg-primary cartBadgeIcon mt-1">{totalQTY}</span>
    </div>

    </>

  )
}

export default CartIcon