import React from 'react';
import styles from "./AdminProductCard.module.css";

 const AdminProductCard = ({product}) => {

  const {title, description, images} = product;

  return (
<>
	<div className={styles.card}>
		<div className={styles.imgBox}>
			<img src={images && images.length ? images[0].url:""}/>
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
			<div className={styles.icon}><i className="fas fa-info-circle"></i></div>
			<div className={styles.contents}>
				{/* <h2 className={styles.detailHead}>VIP Tutorials</h2> */}
    <p className={styles.detailDescription}> {description}</p> </div>
		</div>







	</div>
</>
  )
 }



export default AdminProductCard;
