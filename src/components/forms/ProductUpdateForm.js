import React from "react";
import { Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import styles from "./ProductUpdateForm.module.scss";
import classnames from "classnames";
import FileUpload from "./FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  loading,
  setLoading,
  categories,
  handleCategoryChange,
  subOptions,
  selectedCategory,
  // loading,
  values,
  // setLoading,
  setValues,
  arrayOfSubs,
  setArrayOfSubs,
}) => {
  // Destructure values from the state
  const {
    title,
    description,
    price,
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
        <div className={styles.control}>
        {loading? <Loader/>: <h4 className="pl-3"> Update a product</h4>}

      </div>
        <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          </div>
      </div>
      <div className="form-group mt-3">
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
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >

          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div >
        <label >Subcategories</label>
        <Select
        className="mb-3"
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select a subcategory"
          // value={subs} ==> X this does not work
          value={arrayOfSubs}
          // Cannot use the exact
          // select component
          // used in subcategory of ProductCreateForm.
          // The Ant Design select
          // works differently than
          // DOM select in that
          // the value property by default expects
          // an array of ids.
          // Since the subs
          // here will not contain
          // an array of Ids like before
          // but an array of objects
          // (containing id, name, slug, etc.),
          // the solution is to
          // extract ids of the subcategories
          // and push them in the state
          // pass them as in an array props
          // and consume them as values

          // onChange={(value) => setValues({ ...values, subs: value })} => This will not work
          // for the same reason as above
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleChange}
          value={brand}
        >
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
        <select
          name="color"
          className="form-control"
          onChange={handleChange}
          value={color}
        >
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
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
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
