// Page to display order summary and total
// User lands on this page after clicking
// on "Add to cart"

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {userCart} from '../functions/user';

const Cart = ({history}) => {
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

  // Function for sending request to backend
  // to save the cart in the database
  const saveOrderToDatabase = () => {
    // alert('save order to database');
    // Send in cart from redux
    userCart(cart, user.token)
    .then(res => {
      console.log("Cart post response", res);
      // Only redirect user if res.data.ok is true
      if(res.data.ok)
      history.push("/checkout")
    }).catch((err) => console.log ("Error saving to database", err))
  }

// Function to return a table
  const showCartItems = () => (

    <Table className="table table-bordered">
      {/* Static heading - Table heading holding labels (headings) */}
      <Thead className="thead-light">
        <Tr>
          <Th scope="col">Image</Th>
          <Th scope="col">Title</Th>
          <Th scope="col">Price</Th>
          <Th scope="col">Brand</Th>
          <Th scope="col">Color</Th>
          <Th scope="col">Count</Th>
          <Th scope="col">Shipping</Th>
          <th scope="col">Remove</th>
        </Tr>
      </Thead>
    {/* Dynamic table body - map through products and display
     each product in the cart  */}
      {cart.map((p) => (

        <ProductCardInCheckout  key={p._id} p={p} />
      ))}
    </Table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row mt-3">
        {/* Left side - where table is dispalyed */}
        <div className="col-lg-8 pr-3">
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
            // When user clicks on proceed to checkout button, before redirecting them
            // to checkout, cart should be saved into database
            <button onClick ={saveOrderToDatabase}className="btn btn-sm btn-primary border border-info mt-2 text-info" disabled={!cart.length}>
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
