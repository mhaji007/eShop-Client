import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

// State object
const initialState = {
  title: "",
  descriptioin: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  // Values displayed in the select drop down
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  // Values used for creating the product
  color: "",
  brand: "",
};

const ProductCreate = () => {
  // Instead of separate state variables
  const [values, setValues] = useState(initialState);
  // State for storing fetched subcategories (options to be displayed)
  const [subOptions, setSubOptions] = useState([]);
  // State for controlling display of subcategories
  // initially set to false
  // (prior to user interaction with parent category)
  const [showSub, setShowSub] = useState(false)

  // Destructure user from redux state
  // for sending the token via request to product endpoint
  const { user } = useSelector((state) => ({ ...state }));



  useEffect(() => {
    loadCategories();
  }, []);

  // Load categories upon component mounting
  const loadCategories = () =>
    // Spread the rest of the values, just update the categories array
    getCategories().then((c) => setValues({...values, categories: c.data}));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`Product "${res.data.title}" created successfully`);
        // Page will only reload after
        // user has interacted with the alert
        // window
        window.location.reload();
      })
      .catch((err) => {
        console.log("Logging just err", err);
        if (err.response.status === 400) toast.error(err.response.data);

        // Grab the actual error from axios
        // toast.error(err.response.data.err);
      });
  };

  // Dynamic input handler based on
  // the input name field
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };


// Custom handler for subcategories

// Since subcategories are known only
// when user has clicked the
// (parent) categories drop down,
// the generic dynamic input handler
// above would not suffice
// this handler is designed to
// fetch subcategories based on parent id
// derived from user interaction with categories'
// drop down
  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    // Update category values on click
    setValues({ ...values, category: e.target.value });
    // fetch subcategories based on category id (e.target.value)
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
    // Store fetched subcategories in state for display
      setSubOptions(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2"> */}
        <div>
          <AdminNav />
        </div>

        <div className="col-md-10">
          {/* {JSON.stringify(values.categories)} */}
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            // Passed in for Ant Design's select
            setValues = {setValues}
            values={values}
            handleCatagoryChange = {handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
