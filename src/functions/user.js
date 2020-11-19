// Function used for saving
// the product card in the database
// used by the Cart page

import React from 'react';
import axios from "axios";


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


