import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";



const StripePayment = () => {
  const [items ,itemsState] = useState([]);
  const [totalPrice,totalPriceState] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const getData = ()=>{
    let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
    if (dataLocal!=null) {
        itemsState(dataLocal);
    }
  };

  useEffect(()=>{
    getData();
    let arrayIteem = items;
    let totPric= arrayIteem.reduce((x,y) => x+(y.price * y.qty),0);
    totalPriceState(totPric);
  },[items]);
  // Publish key
  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51N70SXERdEsD7IOLPubHzYk7igJsgzguzfOXhPZOxQQsBXm5x230Nf2BQgOQf0lHCgVRB4ve45KzIv7y9eNpuyCl00PadpA4Im"
      )
    );
  }, []);

  useEffect(() => {
    axios.post(
        "http://localhost:7500/api/payment",
        { total: +totalPrice }
      )
      .then((data) => {
        // setClientSecret(data.data.clientSecret);
        console.log(data.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
    // change key
  }, []);

  return (
    <>
      <h4 className="text-center mt-5 text-success">Please Fill Your Card</h4>
      <div className="container col-6">

        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripePayment;
