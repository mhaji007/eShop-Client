// Component used in Cart page for
// displaying dynamic table body
// displaying poduct details in cart

import React from "react";

const ProductCardInCheckout = ({ p }) => {
  return (
    <tbody>
      <tr>
        <td>Image</td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>{p.color}</td>
        <td>{p.count}</td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
