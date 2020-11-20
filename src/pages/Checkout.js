// Page to display checkout
// user is directed to this page
// after clicking on the proceed to
// checkout button in the cart page

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart } from "../functions/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    //
  };

  const emptyCart = () => {
    // Remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // Remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // Remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  return (
    <div className="row">
      {/* Delivery address and coupon area */}
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button
          className="text-center btn btn-primary bg-info btn-raised"
          onClick={saveAddressToDb}
        >
          Save
        </button>
        <hr />
        <h4>Got a coupon?</h4>
        <br />
        coupon input and apply button
      </div>
      {/* Order summary */}
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p> Products {products.length}</p>
        <hr />
        {/* Loop through array of products */}
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {/* p.product.title and p.product.price are the populated value
              while p.color and p.count are added (user-chosen) values */}
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
   
      <p>Cart Total: {total}</p>

        <div className="row">
          <div className="col-md-6">
            <button className="text-center btn btn-primary bg-info btn-raised">
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button className="text-center btn btn-primary bg-danger btn-raised"  disabled={!products.length}
              onClick={emptyCart}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
