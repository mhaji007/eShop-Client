import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";


// Used for displaying default placeholder
// for products with no/broken image
import noImage from "../../images/noImage.jpg";
import {
  ShoppingCartOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const ProductCard = ({ product, handleRemove }) => {
  const [loading, setLoading] = useState(false);
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
            <h3 className={styles.name}>{title.length > 30
                ? title.substring(0, 30)+"..."
                : title }</h3>
            <div className={styles.price}>${price}</div>
          </div>
          <div
            className={styles.actionContainer}
            style={{
              marginTop: "23px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {/* delete and edit handlers are not implemented here
              because they need to update state. If there were implemented here
              there would be no way to update the deleted or ediited product in
              the state. So update and delete handlers are passed from the parent
              component (AllProducts) as props */}
              <Link  style={{ color: "#747474" }}>
            <div className="mx-auto">
                <ShoppingCartOutlined
                  className="ml-5 mr-5"
                  style={{ fontSize: "30px" }}
                />
                <div className="ml-3">Add to cart</div>
            </div>
              </Link >
              <Link to={`/product/${slug}`} >
            <div className="mx-auto">
                <EyeOutlined
                  className="ml-5 mr-5"
                  style={{ fontSize: "30px" }}
                />
                <div className="ml-3" >View product</div>
            </div>
              </Link>
          </div>
          {/* <h4 className={styles.colors}>Colors</h4> */}
          {/* <ul className={styles.cardUl}>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul> */}
          {/* <button>Buy Now</button> */}
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

export default ProductCard;
