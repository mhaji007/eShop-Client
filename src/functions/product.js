// Collection of functions used for performing CRUD on products

// API methods for categories
// to be used in the components

import axios from "axios";

// Return created product info based on the information(what product), and authtoken
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
// Return all products by limit
export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

// Return removed product info based on slug(which product) and authtoken
export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

// Return single product based on slug(which product)
export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
