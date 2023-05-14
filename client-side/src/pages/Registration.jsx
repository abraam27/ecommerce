import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Registration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((oldData) => ({ ...oldData, [name]: value }))

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios({
      method: "post",
      url: `http://localhost:7500/api/auth/signup`,
      data: user
    }).then(data => {
        setUser(data);
        console.log(data);
        if(data.data.message === "Done"){
            alert("User is signed up plz try confirm your email and login!");
            navigate("/");
        }else{
            alert("User Not Register plz try again!");
        }
        
    }).catch(e => console.log(e));
  }
  return (
        <div className="w-50 mx-auto">
          <h1 className="texttik m-4 d-flex justify-content-center">Registration</h1>
          <div className="form-style">
            <form onSubmit={handleSubmit}>
              <input type="text" name="userName" placeholder="Enter Your Username" value={user.userName} onChange={handleChange}></input>
              <input type="text" name="fullName" placeholder="Enter Your fullName" value={user.fullName} onChange={handleChange}></input>
              <input type="email" name="email" placeholder="Enter Your Email Address xx@xx.com" value={user.email} onChange={handleChange}></input>
              <input type="password" name="password" placeholder="Enter Your Password" value={user.password} onChange={handleChange}></input>
              <input type="text" name="address" placeholder="Enter Your Address" value={user.address} onChange={handleChange}></input>
              <input type="text" name="phone" placeholder="Enter Your Phone 01200000000" value={user.phone} onChange={handleChange}></input>
              <input type="radio" value="Customer" name="role" onChange={handleChange}/> Customer
              <input type="radio" value="Seller" name="role" onChange={handleChange}/> Seller
              <input type="submit" value="SIGNUP" />
            </form>
          </div>
        </div>
  );
};

export default Registration;
