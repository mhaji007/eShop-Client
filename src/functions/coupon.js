// Collection of functions used for performing CRUD on coupon

import axios from "axios";
// Return all coupons
export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

  // Return removed coupon
export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });
// Retrun created coupon
export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
