import React from "react";
import styles from "./AdminProductCard.module.css";
import noImage from "../../images/noImage.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imgBox}>
          <img src={images && images.length ? images[0].url : noImage} />
        </div>
        <div className={styles.details}>
          <div className={styles.textContent}>
            <h3 className={styles.name}>{title}</h3>
            <div className={styles.price}>£250</div>
          </div>
          {/* <h4 className={styles.colors}>Colors</h4>
			<ul className={styles.cardUl}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<button>Buy Now</button> */}
        </div>

        <div className={styles.description}>
          <div className={styles.icon}>
            <i className="fas fa-info-circle"></i>
          </div>
          <div className={styles.contents}>
            {/* <h2 className={styles.detailHead}>VIP Tutorials</h2> */}
            <p className={styles.detailDescription}> {description.lenght>150?description.substring(0,150):description}</p>{" "}
            <div className={styles.actionContainer} style={{height:"30vh", display:"grid", justifyContent:"end", alignItems:"end", gridTemplateColumns:"1fr 1fr"}}>
              <div className="mx-auto">
                <EditOutlined style={{fontSize:"20px"}}  />
              </div>
              <div className="mx-auto">
                <DeleteOutlined  style={{fontSize:"20px"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
