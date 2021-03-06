// When admin clicks on products from the side nav of admin dashboard
// they land on this page where all products created
// are displayed

import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import Loader from "../../../components/loader/Loader";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Destructure user from redux state
  // To be used for sending slug when updating an deleting
  const { user } = useSelector((state) => ({ ...state }));

  // Load all porducts upon component mounting
  useEffect(() => {
    loadAllProducts();
  }, []);
  // Fetch all products
  const loadAllProducts = () => {
    setLoading(true);
    // Fetch 100 products (this is done to prevent server overload)
    getProductsByCount(100)
      .then((res) => {
        // Store products in local state
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // Confirm deletion
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          // Load all products again
          // to update the view
          loadAllProducts();
          toast.error(` Product ${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {/* <div> */}
          <AdminNav />
        </div>
        {loading ? (
          // <h4 className="text-danger">Loading...</h4>
          <div className="mx-auto" style={{marginTop:"30vh"}}>

            <Loader  />
          </div>
        ) : (
          // This makes the cards
          // occupy the whole row (in columns of 4)
          // <div className="col-md-10">
          <div className="container">
            <div className="row m-0 mb-3 justify-content-center">
              {products.map((product) => (
                // <div key={product._id} className="col-md-4">
                <div key={product._id}>
                  <AdminProductCard
                    product={product}
                    // Send handleRemove to child component
                    // Handle remove is implemented here
                    // becauase if it were to be done
                    // in the child component, the parent
                    // would not be updated
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
