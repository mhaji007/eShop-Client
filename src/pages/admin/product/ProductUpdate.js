// Admin is redirected to this page after
// clicking on the edit icon in AdminProductCard
// where slug is retrieved from the url
// and request is made to the backend so
// the data is prepopulated for the user
// on the page

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

// import {useParams} from "react-router-dom";

// ==============================================================//
// Access to route parameter (e.g., …/:routeparameter)

// 1.	in Server:
// req.params.routeparameter
// Or
// import {userParams} from “react-router-dom”;
// let {routeparameter} = useParams();

// 2.	in Client:

// -	if component is a route component it is available on
// props.match.params.routeparameter

// -	if component is note a route component it can be accessed via
// import {userParams} from “react-router-dom”;
// let {routeparameter} = useParams();
// ==============================================================//

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

// Entire application is wrapped in BrowserRotuer
// so we have access to react router props

// Slug is available on props.match.params.slug
const ProductUpdate = ({
  match: {
    params: { slug },
  },
}) => {
  // Instead of separate state variables
  const [values, setValues] = useState(initialState);

  // Destructure user from redux state
  // for sending the token via request to product endpoint
  const { user } = useSelector((state) => ({ ...state }));

  // Load product to be edited on component mounting
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("Single product", p);

      // Update state with values
      // retrieved from the backend
      // The actual data retrieved from
      // axios call is on p.data
      setValues({ ...values, ...p.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Dynamic input handler based on
  // the input name field
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  // let {params} = userParams();
  // Or more specifically
  // let {slug} = useParams();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2"> */}
        <div>
          <AdminNav />
        </div>

        <div className="col-md-10">

          {/* {JSON.stringify(slug)} */}

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues = {setValues}
            // setLoading={setLoading}
            // loading={loading}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
