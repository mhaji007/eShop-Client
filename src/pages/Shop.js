// Component for displaying default products as
// well as products from search results.
// User lands on this page either by entering a
// search term in the searchbar or by clicking
// the shop link

// Hitting enter or clicking on search icon
// without entering a search term
// results in page displaying the default products

import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">Filter menu</div>

        <div className="col-md-9">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
          <h4>{}</h4>
          )}

          {!products&&products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {/* Default products  */}
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
