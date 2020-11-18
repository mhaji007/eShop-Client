import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // Function to calculate the total
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        {/* Left side - where table is */}
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            "show cart items"
          )}
        </div>
        {/* Right side - where order summary is displayed */}
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((p, i) => (
            <div key={i}>
              <p>
                {p.title} x {p.count} = ${p.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {/* Check if user is logged in before proceeding to checkout */}
          {user ? (
            <button className="btn btn-sm btn-primary mt-2 text-info">
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2 text-alert">
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
