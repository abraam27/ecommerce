import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Action_buttons from './../components/Action_buttons';


const Cart = () => {

  const image = "http://localhost:7500/api/images/ProductImages/";

    const [items ,itemsState] = useState([]);
    const getData = ()=>{
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      if (dataLocal!=null) {
          itemsState(dataLocal);
      }
      console.log(dataLocal);
    };

    useEffect(()=>{
      getData();
    },[]);

    const [totalPrice,totalPriceState] = useState(0);
  
    useEffect(()=>{
      let arrayIteem = items;
      let totPric= arrayIteem.reduce((x,y) => x+(y.price * y.qty),0);
      totalPriceState(totPric);
    },[items]);
     
    window.addEventListener("storage",(e) => {
      getData();
    });

    const clearCart = ()=>{
      localStorage.setItem('data-cart',JSON.stringify([]));
      itemsState([]);
      window.dispatchEvent(new Event('storage'));
    }
  return (
    <>
     
     <div className="container my-5 shadow-lg p-3 mb-5 bg-white rounded py-5 ">

          <h2 className='cartItems my-3 text-center pt-5'> Shopping Cart</h2>
          {items.length === 0?<h5 className='text-center h2'>Cart is empty</h5>:''}
          {items && items.map((item,index)=>(
                      <div  key={index} className='row py-3'>
                         <div className="col-md-3">
                             <img className='w-100' src={`${image}/${item.image}`} alt=""/>
                         </div>
                       <div className="col-md-6 offset-md-1 d-flex align-items-center">
                        <div className="">
                           <h6>{item.productName}</h6>
                           <p className='price'>{item.price} EGP</p>
                           <Action_buttons item={item}/>
                        </div>

                      </div>
                  </div>
          ))}
          <div className="row mt-5">
              <div className="offset-md-8 col-md-3 mt-5">
              <p className="text-white text-center btn btn-primary  w-75">Total:{totalPrice} EGP</p>
              <button className="btn btn-warning w-75 mb-2" onClick={()=>clearCart()}>Clear All</button>
              <Link to='/order' className="btn btn-success w-75">Checkout</Link>
            </div>
            </div>
      </div>  
    
    </>
  )
}

export default Cart