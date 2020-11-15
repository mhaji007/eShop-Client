// Page for displaying all the related products
// based on category
// Used when user clicks on one of the categories
// displayed on home page via CategoryList component
// and gets redirected to this page

import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";
import Loader from "../../components/loader/Loader";

const CategoryHome = ({ match }) => {
  // State for storing the single category
  const [category, setCategory] = useState({});
  // State for storing products that share the same category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    // Send slug to detemine which category
    // we want
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 ">
              <Loader/>
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 ">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row m-0 mb-3 justify-content-center">
        {products.map((p) => (
          <div key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
