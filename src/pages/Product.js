import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
// For accessing user's token
import { useSelector } from "react-redux";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  // State for holding star rating before sending it to the backend
  const [star, setStar] = useState(0);
  // Destructure user from redux store
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  // Update component's state
  // make request to backend with the updated new rating
  const onStarClick = (newRating, name) => {
    // Update state with new rating
    setStar(newRating);
    console.table(newRating, name);
    // Make request to backend with the updated star rating
    productStar(name, star, user.token).then((res) => {
      console.log("rating clicked", res.data);
      // For displaying the updated rating in real time
      loadSingleProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
