// Form component used for creating
// products. Used in ProductCreate page

import React from "react";
import { Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import styles from "./ProductCreateForm.module.scss";
import classnames from "classnames";
import FileUpload from "./FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";


const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  loading,
  values,
  setLoading,
  setValue,
  handleCatagoryChange,
  subOptions,
  showSub,
  setValues,
}) => {
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

  return (
    <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.control}>
        {loading? <Loader/>: <h4 className="pl-3">Create a product</h4>}
      </div>
        <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
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
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCatagoryChange}
        >
          <option>Select a category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              // Save the id (objectId, referencing the category) in the database
              <option key={c._id} value={c._id}>
                {/* Display the name to the user */}
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Select a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Select a color</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
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
          <option>Select a shipping status</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {/* {JSON.stringify(subOptions)} */}
      {/* If showSub is true (when categories is clicked) show the subcategories drop-down */}
      {showSub && (
        <div>
          <label> Subcategories</label>
          {/* Cannot use name property in Ant Design's select */}
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select a subcategory"
            value={subs}
            // Whatever is selected is put into value array by Ant Design
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {/* Subcategory options */}
            {subOptions.length &&
              subOptions.map((s) => (
                // Display the name. Save the id
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
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

    /* <form onSubmit={handleSubmit}>
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
          </form> */
  );
};

export default ProductCreateForm;
