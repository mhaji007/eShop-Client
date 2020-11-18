// Component used in Cart page for
// displaying dynamic table body
// displaying poduct details in cart

import React from "react";
import ModalImage from "react-modal-image";
import noImage from "../../images/noImage.jpg";

const ProductCardInCheckout = ({ p }) => {
  return (
    <tbody>
      <tr>
        <td>
          {/* height: auto so the image scales properly */}
          <div style={{width:"200px", height:"auto"}}>
            {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url}/>): (<ModalImage small={noImage} large={noImage}/>)}
          </div>
          </td>
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
