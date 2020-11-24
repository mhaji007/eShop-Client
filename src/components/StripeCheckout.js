// Component used for displaying the strip intent

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  // State for storing user (to extract token)
  const { user } = useSelector((state) => ({ ...state }));
  // State for storing successful transaction from stripe
  const [succeeded, setSucceeded] = useState(false);
  // State for storing Stripe transaction error
  const [error, setError] = useState(null);
  // State for  storing process status of the order
  const [processing, setProcessing] = useState("");
  // State for storing button status
  const [disabled, setDisabled] = useState(true);
  // State for storing client secret retrieved from backend
  // on component load
  const [clientSecret, setClientSecret] = useState("");


  const stripe = useStripe();
  const elements = useElements();
  // Make request to backend to retrieve
  // the client secret on component mount
  // requried for submitting the stripe form
  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log("create payment intent", res.data);
      // store client secret in local state
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e) => {
    //
  };

  const handleChange = async (e) => {
    //
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
    </>
  );
};

export default StripeCheckout;
