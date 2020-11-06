// Collection of functions used for performing CRUD on subcategories

import axios from "axios";

// Return all subcategories
export const getSubcategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

// Return single subcategory based on slug(which subcateogry)
export const getSubcategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
// Return removed subcategory info based on slug(which subcateogry) and authtoken
export const removeSubcategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
// Return updated subcategory info based on slug, updated information(what subcategory), and authtoken
export const updateSubcategory = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
// Return created subcategory info based on the information(what subcategory), and authtoken
export const createSubcategory = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
