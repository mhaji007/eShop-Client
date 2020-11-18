// Component used in Cart page for
// displaying dynamic table body
// showcasing poduct details in cart

import React from "react";
import ModalImage from "react-modal-image";
import noImage from "../../images/noImage.jpg";
import { useDispatch } from "react-redux";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  // Color change handler
  // Update the entire cart
  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        // If product id passed down from cart page
        // is the same as the product we are looping over
        // update the color
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

     // Set the updated cart back in the local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      // update the redux state with the new updated cart
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          {/* height: auto so the image scales properly */}
          <div style={{ width: "200px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={noImage} large={noImage} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>

        {/* Product color */}
        {/* <td>{p.color}</td> */}
        <td>
          <select
          // Update the local storge and redux state
          // on click
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {/* if product has a color
            display the existing color */}
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              // If not show the Select text
              <option>Select</option>
            )}
            {/* Display each color as a select option */}
            {colors
              // Each time before dispalying
              // the rest of the options
              // remove the duplicate options
              // (if the default color is found
              // in the color array, remove it
              // from the array)
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>{p.count}</td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
