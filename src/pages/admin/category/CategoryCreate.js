import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  // Used for displaying created categories
  const [categories, setCategories] = useState([]);

   // step 1
   // State for user's search query
   const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  // Load categories upon component mounting and categories change
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    // Send in name (as an object) and token
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        // Clear name field after submission
        setName("");
        toast.success(`"${res.data.name}" category has been created successfully`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // Ask for confirmation (to be replaced with a modal pop-up)
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} category deleted successfully`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };



    // Function to use in mapping through the categories
    // check if the category name includes the incoming keyword
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);





  return (
    <div className="container-fluid">
      <div className="row">
        {" "}
          {/* <div className="col-md-2"> */}
        <div>
          <AdminNav />
        </div>
        {/* Create category form */}
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            ""
          )}



           <CategoryForm handleSubmit={handleSubmit}
           name={name}
           setName={setName}
           loading={loading}
           />

            <LocalSearch keyword={keyword} setKeyword={setKeyword}/>

          <hr />

          {/* {categories.map((c) => (
             */}

          {/* Add searching and filtering to the map function above.
          Before mapping check if the category names includes the
          incoming keyword and only then display the categories */}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-info"/>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
