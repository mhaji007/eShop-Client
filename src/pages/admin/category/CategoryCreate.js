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
import { SaveOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classnames from "classnames";
import styles from "./CategoryCreate.module.scss";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  // Used for displaying created categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, [categories]);

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

  const categoryForm = () => (
    <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.control}>{/* <h1>

</h1> */}</div>
      <div
        className={classnames(
          styles.control,
          styles.blockCube,
          styles.blockInput
        )}
      >
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <div className={styles.bgTop}>
          <div className={styles.bgInner}></div>
        </div>
        <div className={styles.bgRight}>
          <div className={styles.bgInner}></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.bgInner}></div>
        </div>
      </div>

      <button
        className={classnames(
          styles.btn,
          styles.blockCube,
          styles.blockCubeHover
        )}
        type="submit"
        disabled={loading}
      >
        <div className={styles.bgTop}>
          <div className={styles.bgInner}></div>
        </div>
        <div className={styles.bgRight}>
          <div className={styles.bgInner}></div>
        </div>
        <div className={styles.bg}>
          <div className={styles.bgInner}></div>
        </div>
        <div className={styles.text}>
          {<SaveOutlined />} {""}Save
        </div>
      </button>
    </form>
  );

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
          {categoryForm()}
          <hr />
          {categories.map((c) => (
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
