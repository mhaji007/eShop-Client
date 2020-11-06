// When admin clicks on edit icon on of the created categories
// displayed on the category page, they are redirected to
// this page where they can update the chosen category

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
// import {useParams} from 'react-rotuer-dom';

// This protected route component renders when
// "/admin/category/:slug" path is reached
// by admin attempting to edit the category name
// through edit link in create category page

// history is needed in this route component
// to redirect user to the create page upon success

// the route parameter (slug) is needed
// to identify the resource (the category) to
// be updated

// to get the parameters, there are two options
// destructring match from props or using a react hook
// called useParams
const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  //  let {slug} = useParams()

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    // match.params.slug looks for a route paramter
    // with key of slug on the url. We have access to
    // slug parameter on the url
    // because it is derived in the create component
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" category updated successfully`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading..</h4> : ""}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loading}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
