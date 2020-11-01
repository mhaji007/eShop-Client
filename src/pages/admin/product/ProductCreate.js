import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { SaveOutlined } from "@ant-design/icons";
import styles from "./ProductCreate.module.scss";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

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
  // Instead og separate state variables
  const [values, setValues] = useState(initialState);

  // Destructure user from redux state
  // for sending the token via request to product endpoint
  const { user } = useSelector((state) => ({ ...state }));

  // Destructure values from the state
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;



  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
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
          <div>
            <form
              autoComplete="off"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.control}>
                {/* <h1>
        Join
      </h1> */}
                <h4>Create a product</h4>
              </div>
              <div className="form-group mt-5">
                <div
                  className={classnames(

                    styles.control,
                    styles.blockCube,
                    styles.blockInput
                  )}
                >
                  <input
                    name="title"
                    placeholder="Enter a title"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    autoFocus
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
              </div>
              <div className="form-group">
                <div
                  className={classnames(
                    styles.control,
                    styles.blockCube,
                    styles.blockInput
                  )}
                >
                  <input
                    name="description"
                    placeholder="Enter a description"
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
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
              </div>
              <div className="form-group">
                <div
                  className={classnames(
                    styles.control,
                    styles.blockCube,
                    styles.blockInput
                  )}
                >
                  <input
                    name="price"
                    placeholder="Enter a price"
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
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
              </div>

              <div className="form-group">
                <div
                  className={classnames(
                    styles.control,
                    styles.blockCube,
                    styles.blockInput
                  )}
                >
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Enter a quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
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
              </div>

              <div className="form-group">
                <label>Color</label>
                <select
                  name="color"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Brand</label>
                <select
                  name="brand"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Shipping</label>
                <select
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <button
                className={classnames(
                  "mt-4",
                  styles.btn,
                  styles.blockCube,
                  styles.blockCubeHover
                )}
                type="submit"
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
          </div>

          {/* <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-outline-info">Save</button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
