import axios from "axios";
import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Action_buttons from './../components/Action_buttons';
import jwtDecode from "jwt-decode";

const Order = () => {

  const image = "http://localhost:7500/api/images/ProductImages/";


    // item in cart
    const [items ,itemsState] = useState([]);
    const getData = ()=>{
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      if (dataLocal!=null) {
          itemsState(dataLocal);
      }
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

    // form 
    const [order, setOrder] = useState({
      orderAddress:"",
      phone: "",
      paymentMethod:"",
      products:[]
  });
  
  const handleChange = e => {
    const { value, name } = e.target;
    setOrder((oldData) => ({ ...oldData, [name]: value }))
  };


  const getOrderData = ()=>{
     getData();
    //  console.log(items)
     for (let i = 0; i < items.length; i++) {
      //  product.productID = items[i]._id;
      //  product.quantity = items[i].qty;
      //  product.unitPrice = items[i].price;
      //  console.log(product, i)
       order.products.push({productID:items[i]._id, quantity:items[i].qty, unitPrice:items[i].price});
    }
    console.log(items)
  }
  const clearCart = ()=>{
    localStorage.setItem('data-cart',JSON.stringify([]));
    itemsState([]);
    window.dispatchEvent(new Event('storage'));
  }


  const navigate= useNavigate();

  const onSubmitForm = e => {
      e.preventDefault();
      getOrderData();
      const cofrimOrder = window.confirm("Confirm You Order");
      if (cofrimOrder === true) {
        if(order.paymentMethod === "Cash"){
          let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
          let userData = jwtDecode(encodedToken);
          if(userData == null){
            navigate("../login")
          }
          axios.post(`http://localhost:7500/api/orders/${userData.userID}`, order)
          .then((res) => {
              console.log(res);
              alert("Sucess Creat Your Order");
              clearCart();
              navigate('/');
          }).catch((err) => {
              console.log(err.response.data.message)
          });
        }else{
            navigate("../payment")
        }
      }   

  };

    
  return (
    <>
     
     <div className="conatiner mt-5 pb-5">
            <div className="row justify-content-center">
                <div className=" col-md-6  p-5 rounded shadow">
                    <form className='mb-5 form-style' onSubmit={onSubmitForm}>
                    <input type="text" name="orderAddress" placeholder="Enter Your Address" value={order.orderAddress} onChange={handleChange}></input>
                    <input type="text" name="phone" placeholder="Enter Your Phone 01200000000" value={order.phone} onChange={handleChange}></input>
                    <input type="radio" value="Cash" name="paymentMethod" onChange={handleChange}/> Cash
                    <input type="radio" value="Visa" name="paymentMethod" onChange={handleChange}/> Visa
                    <div className=''>
                        <button type="submit" className="btn btn-primary m-2 px-l-5 px-3 ">Save and Deliver</button>
                        <button type="submit" className="btn btn-danger m-3 px-l-5 px-4 "><Link className="text-decoration-none text-white" to='/'>Cancel</Link></button>
                    </div>
                  </form>
                </div>

                <div className=" ms-5  col-lg-3 col-md-5 ">
                    <div className="card p-4 w-100">
                        <h4 className='p-1 ms-2 text-center'>your Order</h4> <hr/>
                        {items && items.map((item,index)=>(
                        <div key={index} className="card-body text-center">
                            <img className="card-img-top img-fluid w-50" src={`${image}/${item.image}`} alt="Card image cap"/>
                            <h6>{item.productName}</h6>
                            <p className='price'>{item.price} EGP</p>
                            <Action_buttons item={item}/>
                        </div>
                        ))}

                          <p className="text-white text-center btn btn-dark mt-5 mx-auto  w-50">Total:{totalPrice} EGP</p>
                     </div>

                </div>
            </div>
        </div>

    
    </>
  )
}

export default Order