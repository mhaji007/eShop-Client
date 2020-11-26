
import React from 'react';
import axios from "axios";

// Function used for saving
// the product cart in the database
// used by the Cart page

export const userCart = async(cart, authtoken) => (
  // Send in cart as an object
  // sending cart without wrapping it in an object makes it available f
  // directly on the body and complicates the process of extracting it
  await axios.post(`${process.env.REACT_APP_API}/user/cart`, {cart}, {
    headers: {
      authtoken,
    },
  })
)

// Function used for retrieving
// the product cart from the database
// used by checkout
export const getUserCart = async(authtoken) => (
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  })
)

// Function used for deleting/emptying
// the product cart from the database
// used in checkout
export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`,{
    headers: {
      authtoken,
    },
  });

// Function used for saving user's address
// used in checkout
  export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );


  export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );


  export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );


  export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });



