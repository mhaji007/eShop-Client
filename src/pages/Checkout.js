// Page to display checkout
// user is directed to this page
// after clicking on the proceed to
// checkout button in the cart page

import React from "react";

const Checkout = () => {
  const saveAddressToDb = () => {
    //
  };

  return (
    <div className="row">
      {/* Delivery address and coupon area */}
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button className="text-center btn btn-primary bg-info btn-raised" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>
      {/* Order summary */}
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products x</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart Total: $x</p>

        <div className="row">
          <div className="col-md-6">
            <button className="text-center btn btn-primary bg-info btn-raised">Place Order</button>
          </div>

          <div className="col-md-6">
            <button className="text-center btn btn-primary bg-danger btn-raised">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
