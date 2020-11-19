// Component used in Cart page for
// displaying dynamic table body
// showcasing poduct details in cart

import React from "react";
import ModalImage from "react-modal-image";
import noImage from "../../images/noImage.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
        // Otherwise all the products in table
        // would update
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

  // Quantity change handler

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  // Remove product handler
  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          {/* height: auto so the image scales properly */}
          <div style={{ width: "150px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={noImage} large={noImage} />
            )}
          </div>
        </Td>
        <Td style={{paddingTop:"55px"}}>{p.title}</Td>
        <Td style={{paddingTop:"55px"}}>${p.price}</Td>
        <Td style={{paddingTop:"55px"}}>{p.brand}</Td>

        {/* Product color */}
        {/* <td>{p.color}</td> */}
        <Td style={{paddingTop:"30px"}}>
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
        </Td>
        {/* Product count */}
        {/* {p.count} */}

        <Td className="text-center align-middle">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </Td>

        <Td style={{paddingTop:"55px" , paddingLeft:"45px"}}>
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-info" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </Td>
        <Td style={{paddingTop:"55px" , paddingLeft:"35px"}}>
          <DeleteOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </Td>
      </Tr>
    </Tbody>
  );
};

export default ProductCardInCheckout;
