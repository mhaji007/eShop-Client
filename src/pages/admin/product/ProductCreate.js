import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

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
  const { user } = useSelector((state) => ({ ...state }));
  // Instead of separate state variables
  const [values, setValues] = useState(initialState);

  // Destructure user from redux state
  // for sending the token via request to product endpoint

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

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2"> */}
        <div>
          <AdminNav />
        </div>

        <div className="col-md-10">
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
