import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match: {params:{slug}} }) => {
  const [product, setProduct] = useState({});


  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div>Related products</div>
      </div>
    </div>
  );
};

export default Product;
