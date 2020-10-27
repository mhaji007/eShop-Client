// API methods for categories
// to be used in the components

import axios from "axios";
// Retrun all categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

// Return single category based on slug(which cateogry)
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// Return removed category info based on slug(which cateogry) and authtoken
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
// Return updated category info based on slug, updated information(what category), and authtoken
export const updateCategory = async (slug, category, authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
  headers: {
    authtoken,
  },
});

// Return created category info based on the information(what category), and authtoken
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });
