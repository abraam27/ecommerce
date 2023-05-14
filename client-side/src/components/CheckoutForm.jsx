import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import jwtDecode from "jwt-decode";

import axios from "axios";

import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);


    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        //return_url: `${window.location.origin}/completion`,
        //create order
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Create Order Here
      
      navigate("/");
      alert("Paid succussfully")
    } else {
      window.alert("payment failed");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span >{isProcessing ? "Processing ... " : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
};

export default CheckoutForm;
