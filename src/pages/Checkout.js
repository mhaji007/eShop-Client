// Page to display checkout
// user is directed to this page
// after clicking on the proceed to
// checkout button in the cart page

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user} = useSelector((state) => ({ ...state }));

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

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button
        className="text-center btn btn-primary text-success border border-success mt-2"
        onClick={saveAddressToDb}
      >
        Save
      </button>
    </>
  );

  const applyDiscountCoupon = () => {
    console.log('send coupon to backend', coupon);
    applyCoupon(user.token, coupon). then (res => {
      console.log("Res from coupon applied", res.data);
      if(res.data) {
        setTotalAfterDiscount(res.data);
        // Update redux store
        // We need access to the discounted price on other pages
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {/* p.product.title and p.product.price are the populated value
          while p.color and p.count are added (user-chosen) values */}
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

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
      // If user decides to empty the cart
      // after discount is applied and
      // success message is shown
      // Clear discount total
      setTotalAfterDiscount(0);
      // Clear coupon
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };



  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        onChange={(e) => {
          setCoupon(e.target.value)
          // If error is displayed previously
          // because of entering invalid coupon
          // clear it once user starts to type
          setDiscountError("")
        }}
        value={coupon}
        type="text"
        className="form-control"
      />

      <button
        onClick={applyDiscountCoupon}
        className="text-center btn btn-primary text-info border border-info mt-2"
      >
        Apply
      </button>
    </>
  );



  return (
    <div className="container-fluid mt-3">
      <div className="row ">
        {/* Delivery address and coupon area */}
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          {showAddress()}
          <hr />
          <h4>Got a coupon?</h4>
          <br />
          {showApplyCoupon()}
          <br/>
          {discountError && <p className="text-white bg-danger p-2">{discountError}</p>}
        </div>

        {/* Order summary */}
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p> Products {products.length}</p>
          <hr />
          {/* Loop through array of products */}
          {showProductSummary()}
          <hr />

          <p>Cart Total: {total}</p>

          {totalAfterDiscount > 0 && (
           <p className="text-white bg-success p-2"> Discount Applied - Total Payable: ${totalAfterDiscount}</p>
          )}

          <div className="row">
            <div className="col-md-6">
              <button
                className="text-center btn btn-primary text-info border border-info"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            </div>

            <div className="col-md-6">
              <button
                className="text-center btn  text-danger border border-danger"
                disabled={!products.length}
                onClick={emptyCart}
              >
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
