// Component used for listing all the categories
// to be displayed in home page
// If user clicks on any category
// slug is pushed onto the url  as route parameter (/category/${c.slug})
// and user is redirected to the CategoryHome page
// where slug is extracted from the url and
// a request is made to the backend to display all
// products that share the chosen category

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import Loader from "../loader/Loader";

const CategoryList = () => {
  // State for storing all categories retrieved from the server
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
         {/* Push slug onto the url */}
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          // <h4 className="text-center">Loading...</h4>
          <Loader/>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
