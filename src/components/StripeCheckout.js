// Component used for displaying the strip intent

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import {Link} from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined, SwapOutlined } from "@ant-design/icons";
import noImage from "../images/noImage.jpg";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  // State for storing user (to extract token)
  const { user, coupon } = useSelector((state) => ({ ...state }));
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

  // Retrieved from the backend

  // State for storing total before discount
  const [cartTotal, setCartTotal] = useState(0)
  // State for storing total after discount
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  // State for storing total after discount applied or not (same as total if no coupon applied)
  const [payable, setPayable ] = useState(0)

  const stripe = useStripe();
  const elements = useElements();
  // Make request to backend to retrieve
  // the client secret on component mount
  // requried for submitting the stripe form
  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent", res.data);
      // store client secret in local state
      setClientSecret(res.data.clientSecret);
            // Additional response received on successful payment

            console.log("======>", res.data)
            console.log("======>", res.data.cartTotal)
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // Get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  // Listen for changes in the card element
  // and display any errors as the user types their card details
  const handleChange = async (e) => {
    // Disable pay button if errors
    setDisabled(e.empty);
    // Display error message
    setError(e.error ? e.error.message : "");
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
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={noImage}
              style={{
                height: "150px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

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
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
