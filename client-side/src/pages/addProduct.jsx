import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";


const AddProduct = () => {
  const navigate = useNavigate();
  let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
  let userData = jwtDecode(encodedToken);
  if(userData == null){
    navigate("../login")
  }
  const [product, setProduct] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct((oldData) => ({ ...oldData, [name]: value }))

  }
  function imageHandler(e) {

    setProduct({ ...product, [e.target.name]: e.target.files });

  }
  async function formSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < product.image.length; i++) {
      formData.append('image', product.image[i]);
    }
    formData.append('productName', product.productName);
    formData.append('description', product.description);
    formData.append('numberOfItems', product.numberOfItems);
    formData.append('price', product.price);


      //TODO check url
      console.log(formData)
      await axios.post(`http://localhost:7500/api/auth/signup${userData.userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      alert("Added succussfully")
      navigate("../myProducts")


  }
  return (
        <div className="w-50 mx-auto">
          <h1 className="texttik m-4 d-flex justify-content-center">Add Product</h1>
          <div className="form-style">
            <form onSubmit={formSubmit}>
              <input type="text" name="productName" placeholder="Enter Product Name" value={product.productName} onChange={handleChange}></input>
              <input type="text" name="description" placeholder="Enter Description" value={product.description} onChange={handleChange}></input>
              <input type="text" name="numberOfItems" placeholder="Enter Number of items" value={product.numberOfItems} onChange={handleChange}></input>
              <input type="text" name="price" placeholder="Enter price" value={product.price} onChange={handleChange}></input>
              <input type="file"  id="image" name="image" onChange={imageHandler}/> Product Image
              <input type="submit" value="SIGNUP" />
            </form>
          </div>
        </div>
  );
};

export default AddProduct;
