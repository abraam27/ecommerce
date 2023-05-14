import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './../components/CartIcon';
import { useNavigate } from 'react-router-dom';


const Navbar = ({loggedInUser}) => {
  const navigate = useNavigate();
  // const { totalPrice} = props;
  console.log(loggedInUser);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
    <div class="container">
      <Link className="navbar-brand" to='/'>eCommerce</Link>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {loggedInUser && (loggedInUser?.role === "Seller" ? (
          <>
          <li class="nav-item">
            {loggedInUser.userName}
          </li>
          <li class="nav-item">
            <Link className="nav-link" to='/myProducts'>My Products</Link>
          </li>
        </>
        ) : (
          <li class="nav-item">
            {loggedInUser.userName}
          </li>
        )) }
        {!loggedInUser ?  (
          <>
            <li class="nav-item">
              <Link className="nav-link" to='/login'>Login</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to='/signup'>Sign up</Link>
            </li>
          </>
        ):(
          <li class="nav-item">
              <Link className="nav-link" to='/login' onClick={() => {
                localStorage.removeItem("userToken"); //Remove the token from Local Storage
                navigate("/");
                window.location.reload();
              }}>Logout</Link>
          </li>
        )}
          <li class="nav-item text-white cart pt-2 right">
            <CartIcon />
          </li>
        </ul>
    </div>
  </nav>
    </>
  )
}

export default Navbar