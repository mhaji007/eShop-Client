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
// Used both by the admin (when prepoulating
// the product's data on edit page)
// and the regular user (when navigating
// to the detail page)
export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

// Return updated product info based on slug, updated information(what product), and authtoken
  export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
// Retrun recently created products (new arrivals) based on sore, order, and limit parameters sent
// in the body of the request
export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page
  }, {

  });

  // Return total count of all products
export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);



  export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

  // Return related product based on product Id excluding the current product
  export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);


  export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
