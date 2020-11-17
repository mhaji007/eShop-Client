// Component for displaying default products as
// well as products from search results.
// This component houses all search/filter options

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
import { getCategories } from "../functions/category";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";
// Menu, slider (price slider), checkbox (category checkbox)
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";

// Destructure submenu and item group
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  // State for storing the array of products to be displayed
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // State for storing the array of prices
  const [price, setPrice] = useState([0, 0]);
  // State for storing the value of when is ok to send a request
  // without this variable when user moves the slider hundreds of request
  // will be sent to the backend
  const [ok, setOk] = useState(false);
  // State for storing all the categoires fetched from the backend (sidebar display)
  const [categories, setCategories] = useState([]);
  // State for storing categories checked by the user to send to the backend
  const [categoryIds, setCategoryIds] = useState([]);

  let dispatch = useDispatch();
  // Access redux state containing user's text input
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    // Fetch all products and store the result in the state
    loadAllProducts();
    // Fetch all categories and store the result in the state
    getCategories().then((res) => setCategories(res.data));
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

  // Load products based on category
  // Loop through fetched categories and display the
  // current categories in the state in a list of checkboxes
  const showCategories = () =>
    categories.map((c) => (
      // Display each category in antd checkbox
      <div key={c._id}>
        <Checkbox
          // Anytime user clicks
          // grab the value and store it
          // in the state
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          // Value sent to the backend
          // to fetch all the products
          value={c._id}
          name="category"
          // Check for each category id in the categoryIds state
          // If it is checked, display as checked otherwise display
          // as unchecked
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

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

  // Categories handler
  const handleCheck = (e) => {

    // Reset any values displayed
    // on the search bar to prevent confusion
    // that search by text is still active
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Reset any values displayed on the
    // slider to prevent confusion that searh
    // by price is still active
    setPrice([0, 0]);


    // Should be able to check more than one category
    // Should not store duplicate categories in the state

    // Store all the categories checked already in the state
    let inTheState = [...categoryIds];
    // Store the value user just checked or unchecked
    let justChecked = e.target.value;
    // Check whether the value checked by the user is
    // present in the array of categories already checked in the state
    let foundInTheState = inTheState.indexOf(justChecked);

    // If the value just checked is not already in the state
    if (foundInTheState === -1) {
      // Push the newly chosen id to the state
      inTheState.push(justChecked);
    } else {
      // If found pull out one item from index
      // Take one item out of the array at the index of found
      // Return inThestate without any duplicates
      inTheState.splice(foundInTheState, 1);
    }
    // Store categories with no duplicate in the state
    setCategoryIds(inTheState);
    // Fetch products based on the array of categories
    fetchProducts({ category: inTheState });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mt-3 pt-2">
          {/* <h4 className="text-center">Filter</h4> */}
          <hr />
          {/* mode: inline for corret placement */}
          {/* defaultOpenKeys references the keys used for submenus
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
                  // Set the max value for the slider
                  //(default is 100)
                  max="5000"
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">
              <Loader />
            </h4>
          ) : (
            <h4 className="text-center">{""}</h4>
          )}

          {!products && products.length < 1 && <p>No products found</p>}

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
