// Admin is redirected to this page after
// clicking on the edit icon in AdminProductCard
// where slug is retrieved from the url
// and request is made to the backend so
// the data is prepopulated for the user
// on the page

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
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

// Local state object
const initialState = {
  title: "",
  descriptioin: "",
  price: "",
  // Unlike ProductCreate
  // we are not using categories
  // since loadProduct runs when
  // component is mounted and
  // at that time when we try to
  // update the result, it will be delayed
  // by few miliseconds and is not
  // reflected in the state and that is why
  // here and we establish a separate
  // local state for it
  // categories: [],
  category: "",
  // Array of subcategories
  // used to update the product
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
  history
}) => {
  // Local state for storing
  // all product states instead of separate state variables
  const [values, setValues] = useState(initialState);

  // State for storing categories as
  // an independent state value (as opposed to being part of initialState)
  const [categories, setCategories] = useState([]);

  // state for storing subcategory options
  // used for dsiplaying the options to user to choose from
  const [subOptions, setSubOptions] = useState([]);

  // State for storing the changed(updated) category
  // used for comparing with the category state in the initialState
  // to see whether we are back to the default selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // State for storing the array of subcategories
  const [arrayOfSubs, setArrayOfSubs] = useState([]);

  // Destructure user from redux state
  // for sending the token via request to product endpoint
  const { user } = useSelector((state) => ({ ...state }));

  // State for storing loading state for image upload
  const [loading, setLoading] = useState(false);

  // Load product and categories to be edited on component mounting
  useEffect(() => {
    loadProduct();
    // Fetch all categories
    // so that user can select any
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("Single product", p);
      // Load single product
      // Update state with values
      // retrieved from the backend
      // The actual data retrieved from
      // axios call is on p.data
      setValues({ ...values, ...p.data });

      // Load single product subcategories
      // Fetch subcategories to be used as default options
      // when component loads for the first tie,
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // Prepare array of sub ids to show as default
      // sub values in Ant Design Select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      // Required for Ant Design select to work
      setArrayOfSubs((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      // Category used as an independent value
      // no need to rely on product's state
      // So the following commented line is not needed
      // setValues({...values, categories: c.data});
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add updated values to the values property
    // so they can easily be destructured
    values.subs = arrayOfSubs;
    // Check for selected category
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"Product ${res.data.title}" is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  // Dynamic input handler based on
  // the input name field
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  // Load the subcategory belonging to the category just clicked

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

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    // Get category Id and update the state (category string in initialState)
    // clear any possible subs from previous category id
    // setValues({ ...values, subs: [], category: e.target.value });
    setValues({ ...values, subs: []});

    setSelectedCategory(e.target.value);

    // Fetch subcategories based on category id (e.target.value)
    // and populate in the state as subOptions
    // so that user can select them from dropdown menu
    // Once user selects the options it is then populated
    // in the subs array in the state (subs array in initialState)
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    console.log("EXISTING CATEGORY values.category", values.category);

    // if admin clicks on a different category
    // and navigates away from the default selected
    // category and then clicks back to the default selected category,
    // display the original sub categories in default
    if (values.category._id === e.target.value) {
    // Load products once again to display
    // updated information
      loadProduct();
    }
    // Clear old sub category ids
    setArrayOfSubs([]);
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
            setValues={setValues}
            setLoading={setLoading}
            loading={loading}
            values={values}
            handleCategoryChange={handleCategoryChange}
            // categories sent in
            // as an independent value
            // since it is no longer
            // available in initialState
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
