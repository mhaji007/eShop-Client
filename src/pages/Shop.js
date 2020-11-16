// Component for displaying default products as
// well as products from search results.
// User lands on this page either by entering a
// search term in the searchbar or by clicking
// the shop link

// ==== Prior to landing on this page (when user is on any other page performing a search) ======
// Hitting search or clicking on search icon
// without entering a search term
// results in user landing on this page
// and the default products being displayed

// Hitting search after entering a search term
// results in search term being stored in the redux state
// and added onto the url as query parameter ( history.push(`/shop?${text}`))
// User then is redirected to this page (shop page)
// Where search term is extracted from the redux store
// and a request is sent to the backend
// display the product that match the search term

import React, { useState, useEffect } from "react";
import { getProductsByCount, fetchProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Access redux state containing user's text input
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  // Load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // Load products per user's search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      // improve performance by delaying request
      fetchProducts({ query: text });
    }, 300);
    // Clear timeout
    return () => clearTimeout(delayed);
  }, [text]);

  // Send in text
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
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
