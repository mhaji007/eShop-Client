import React from "react";
import { Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import styles from "./ProductUpdateForm.module.scss";
import classnames from "classnames";
import FileUpload from "./FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  // loading,
  values,
  // setLoading,
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
        <h4 className="pl-3">Update a product</h4>
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
  );
};

export default ProductUpdateForm;
