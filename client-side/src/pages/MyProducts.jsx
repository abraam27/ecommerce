import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";
import jwtDecode from "jwt-decode";

const MyProduct = () => {
  let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
  let userData = jwtDecode(encodedToken);
  const image = "http://localhost:7500/api/images/ProductImages/";
  const [products,productsState] = useState(null);

  function displayData(){

       axios.get(`http://localhost:7500/api/products/my/${userData.userID}`).then((res)=>{
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
    const deleteProduct = (id)=>{
      axios.delete(`http://localhost:7500/api/products/delete/${id}`).then(
        alert("The Product is Deleted Successfully !!")
        )
        window.location.reload();
    }
  return (
      <div className="container py-5">
      
    
    <h3>Products / <Link className="limk" to={`/addProduct`}>Add Product</Link></h3>
    <table id="table">
        <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Number of Items</th>
            <th>Price</th>
            <th>image</th>
            <th>Delete</th>
        </tr>
        {products?.map((p)=><tr key={p._id}>
          {p.productName&&<td>{p.productName}</td>}
          {p.description&&<td>{p.description}</td>}
          {p.numberOfItems&&<td>{p.numberOfItems}</td>}
          {p.price&&<td>{p.price}</td>}
          <td><img className="imgIcons" src={`${image}/${p.image}`} alt="Card image cap"/></td>
          <td><button onClick={()=>{deleteProduct(p._id)}} className="btn btn-danger ml-3"><BiTrash className="action-Btn"/></button></td>
        </tr>)}
    </table>
    </div>  
  )
}

export default MyProduct