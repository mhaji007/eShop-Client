// Component used for listing all the subcategories
// to be displayed in home page

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubcategories } from "../../functions/subcategory";
import Loader from "../loader/Loader";

const SubCategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubcategories().then((res) => {
      setSubcategories(res.data);
      setLoading(false);
    });
  }, []);

  const showSubcategories = () =>
    subcategories.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-raised m-3"
      >
        <Link to={`/subcategory/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          // <h4 className="text-center">Loading...</h4>
          <Loader/>
        ) : (
          showSubcategories()
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
