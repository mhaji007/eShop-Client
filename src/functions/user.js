
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

