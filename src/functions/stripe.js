// Function for making request to stripe endpoint
// in backend (create-payment-intent endpoint)
// StripeCheckout component

import axios from "axios";

// Send in token for user verification and coupon for
// adjusting the total in case coupon is applied (coupon is true)
export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    // If coupon is true, total is recalculated in the backend
    {couponApplied: coupon},
    {
      headers: {
        authtoken,
      },
    }
  );
