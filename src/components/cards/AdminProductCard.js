import React from "react";
import styles from "./AdminProductCard.module.css";
// Used for displaying default placeholder
// for products with no/broken image
import noImage from "../../images/noImage.jpg";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
// Need to redirect admin after
// clicking on edit to product page
// Unlike delete functionality that
// can be performed on the spot
// using onClick handler
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
  // Destructure values to be displayed
  // and slug (for deleting and editing)
  const { title, description, images, slug, price } = product;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imgBox}>
          <img src={images && images.length ? images[0].url : noImage} />
        </div>
        <div className={styles.details}>
          <div className={styles.textContent}>
            <h3 className={styles.name}>{title}</h3>
            <div className={styles.price}>${price}</div>
          </div>
          <div
              className={styles.actionContainer}
              style={{
                marginTop:"50px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {/* delete and edit handlers are not implemented here
              because they need to update state. If there were implemented here
              there would be no way to update the deleted or ediited product in
              the state. So update and delete handlers are passed from the parent
              component (AllProducts) as props */}
              <div className="mx-auto">
                <Link to={`/admin/product/${slug}`} style={{color: "#747474"}}>
                  <EditOutlined style={{ fontSize: "25px" }} />
                </Link>
              </div>
              <div className="mx-auto text-danger" >
                <DeleteOutlined
                  style={{ fontSize: "25px" }}
                  onClick={() => handleRemove(slug)}
                />
              </div>
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
            <QuestionCircleOutlined style={{ fontSize: "15px" }} />
          </div>
          <div className={styles.contents}>
            {/* <h2 className={styles.detailHead}>VIP Tutorials</h2> */}
            <p className={styles.detailDescription}>
              {" "}
              {description.lenght > 150
                ? description.substring(0, 150)
                : description}
            </p>{" "}

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
