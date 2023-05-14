import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddItemToCart from './../components/AddItemToCart';

const Product = () => {
  const image = "http://localhost:7500/api/images/ProductImages/";
  const [products,productsState] = useState(null);

  function displayData(){

       axios.get("http://localhost:7500/api/products").then((res)=>{
          let {data} = res;
          console.log(data);
          productsState(data);
       }).catch((err)=>{
        console.log(err.message);
       })
   };

   useEffect(()=>{
       displayData();
    },[]);
  return (
    <>
      <div className="container py-5">
          <div className='row'>
                {products && products.map((item,index) =>(
                    <div key={index} className='col-md-4'>
                        <div className="item text-center mb-2 pb-2 itemCoun">
                            <img className='w-100 imageItem' src={`${image}/${item.image}`} alt="" />
                            <div className="cart-Title mt-2">
                              <h6 className='tile-product my-1 mainColorText'>{item.productName}</h6>
                              <h6 className='descrip mt-2'>{item.description}</h6>
                              <span>{item.price} EGP</span>
                            </div>
                            <AddItemToCart item={item}/>
                        </div>
                    </div>
                ))}
          </div>
      </div>  
    </>
  )
}

export default Product