import React from "react";
import styles from "./Loader.module.css";
import classnames from "classnames";

const Loader = () => {
  return (
    <div className={ classnames(styles.loaderBox, "mx-auto")}>
      <div className={classnames(styles.side, styles.side1)}></div>
      <div className={classnames(styles.side, styles.side2)}></div>
      <div className={classnames(styles.side, styles.side3)}></div>
      <div className={classnames(styles.side, styles.side4)}></div>
      <div className={classnames(styles.side, styles.side5)}></div>
      <div className={classnames(styles.side, styles.side6)}></div>
    </div>
  );
};

export default Loader;
