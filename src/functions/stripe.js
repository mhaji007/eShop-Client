// Function for making request to stripe endpoint
// in backend (create-payment-intent endpoint)
// StripeCheckout component

import axios from "axios";

export const createPaymentIntent = (authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
