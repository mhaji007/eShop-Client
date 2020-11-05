import React from "react";
import styles from "./AdminProductCard.module.css";
import noImage from "../../images/noImage.jpg";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const AdminProductCard = ({ product, handleRemove }) => {
  // Destructure values to be displayed
  // and slug (for deleting and editing)
  const { title, description, images, slug } = product;

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
          <QuestionCircleOutlined  style={{fontSize:"15px"}} />
          </div>
          <div className={styles.contents}>
            {/* <h2 className={styles.detailHead}>VIP Tutorials</h2> */}
            <p className={styles.detailDescription}> {description.lenght>150?description.substring(0,150):description}</p>{" "}
            <div className={styles.actionContainer} style={{height:"30vh", display:"grid", justifyContent:"end", alignItems:"end", gridTemplateColumns:"1fr 1fr"}}>
              {/* delete and edit handlers are not implemented here
              because they need to update state. If there were implemented here
              there would be no way to update the deleted or ediited product in
              the state. So update and delete handlers are passed from the parent
              component (AllProducts) as props */}
              <div className="mx-auto">
                <EditOutlined style={{fontSize:"20px"}}  />
              </div>
              <div className="mx-auto">
                <DeleteOutlined  style={{fontSize:"20px"}} onClick={()=>handleRemove(slug)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
