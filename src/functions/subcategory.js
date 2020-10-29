import axios from "axios";

export const getSubcategories= async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSubcategory= async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSubcategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSubcategory = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSubcategory = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
