// Admin is redirected to this page after
// clicking on the edit icon in AdminProductCard
// where slug is retrieved from the url
// and request is made to the backend so
// the data is prepopulated for the user
// on the page


import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
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


const ProductUpdate = ({match: {params:{slug}}}) => {

  // Destructure user from redux state
  // for sending the token via request to product endpoint
  const { user } = useSelector((state) => ({ ...state }));

  // let {slug} = useParams();


  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2"> */}
        <div>
          <AdminNav />
        </div>

        <div className="col-md-10">
          Product Update
          {JSON.stringify(slug)}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
