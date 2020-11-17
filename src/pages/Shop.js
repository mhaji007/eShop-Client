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
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";
// Menu and slider (price slider)
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";
// Destructure submenu and item group
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // State for storing the array of prices
  const [price, setPrice] = useState([0, 0]);
  // State for storing the value of when is ok to send a request
  // without this variable when user moves the slider hundreds of request
  // will be sent to the backend
  const [ok, setOk] = useState(false);

  let dispatch = useDispatch();
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

  // Load products based on price range
  useEffect(() => {
    console.log("Ok to request");
    fetchProducts({ price });
  }, [ok]);

  // Slider handler
  const handleSlider = (value) => {
    // Remove any search query term
    // from redux state
    // Querying of database is done
    // one filter at a time (i.e.,
    // a given user can only filter based
    // on one criteria)
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Update price in the state
    setPrice(value);
    // Changing the ok state
    // so we can send a request
    // to the backend
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Filter</h4>
          <hr />
          {/* mode: inline for corret placement */}
          {/* defaultOpenKeys is the keys used for submenus
          What keys we want to have open */}
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            <SubMenu
              key="1"
              // title of the slider
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  // Format hover over tip menu
                  // everytime there is a change
                  // return the value with a dollar sign
                  // in the front (otherwise it would display
                  // the price only)
                  tipFormatter={(v) => `$${v}`}
                  // Type of slider (range type)
                  range
                  value={price}
                  // Update the state
                  onChange={handleSlider}
                  // Set the max value for th slider
                  //(default is 100)
                  max="5000"
                />
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
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
