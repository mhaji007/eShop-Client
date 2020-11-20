// Page to display checkout
// user is directed to this page
// after clicking on the proceed to
// checkout button in the cart page

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

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
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
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
    <div className="container-fluid mt-3">
        <div className="row ">
      {/* Delivery address and coupon area */}
      <div className="col-md-6">
        <h4>Delivery Address</h4>

        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="text-center btn btn-primary text-success border border-success mt-2" onClick={saveAddressToDb} >
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
            <button className="text-center btn btn-primary text-info border border-info" disabled={!addressSaved || !products.length}>
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button className="text-center btn  text-danger border border-danger"  disabled={!products.length}
              onClick={emptyCart}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>

  );
};

export default Checkout;
