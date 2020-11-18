// Page to display order summary and total
// User lands on this page after clicking
// on "Add to cart"

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";


const Cart = () => {
  // Destructure user and cart from redux state
  // user is needed to check for logged in status
  // before allowing users to proceed to checkout
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // Function to calculate the total for each of the products
  // in the cart
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDatabase = () => {

  }

// Function to return a table
  const showCartItems = () => (
    <table className="table table-bordered">
      {/* Static heading - Table heading holding labels (headings) */}
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
    {/* Dynamic table body - map through products and display
     each product in the cart  */}
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        {/* Left side - where table is */}
        <div className="col-md-8">
          <h4>Products in cart: {cart.length}</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
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
            // If there is no item in cart, disable the proceed to checkout button
            <button onClick ={saveOrderToDatabase}className="btn btn-sm btn-primary mt-2 text-info" disabled={!cart.length}>
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2 text-alert">
              {/* Redirect user to this (cart) page after logging in
              - refer to roleBasedRedirect implemented in Login in auth */}
                <Link to ={{
                  pathname: "/login",
                  state: {from:"cart"}
                }}>
              Login to Checkout
                </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
