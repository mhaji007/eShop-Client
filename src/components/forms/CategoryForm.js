import React from "react";
import { SaveOutlined} from "@ant-design/icons";
import classnames from "classnames";
import styles from "./CategoryForm.module.scss";

const CategoryForm = ({handleSubmit, name, setName, loading}) => (

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

export default CategoryForm;
