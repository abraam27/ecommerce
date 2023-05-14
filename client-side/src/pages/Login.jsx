import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((oldData) => ({ ...oldData, [name]: value }))

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // setUser((oldData) => [...oldData, { ...user }]);
    console.log(user);
    axios({
      method: "post",
      url: `http://localhost:7500/api/auth/login`,
      data: user
    }).then(data => {
        setUser(data);
        console.log(data);
        if(data.data.message == "Login Success"){
            localStorage.setItem("userToken", data.data.token);
            // getLoginUser()
            let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
            let userData = jwtDecode(encodedToken);
            console.log(userData);
            navigate("/");
            window.location.reload();
        }else{
            alert("User Not Found or password and Email is wrong");
        }
        
    })
    console.log(user);
    // navigate(`../admin/playerDetails/${playerID}`);
  }
  return (
        <div className="w-50 mx-auto">
          <h1 className="texttik m-4 d-flex justify-content-center">Login</h1>
          <div className="form-style">
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Enter Your Email Address" value={user.email} onChange={handleChange}></input>
              <input type="password" name="password" placeholder="Enter Your Password" value={user.password} onChange={handleChange}></input>
              <input type="submit" value="LOGIN" />
            </form>
          </div>
        </div>
  );
};

export default Login;
