import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
// For accessing user's token
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";


const Product = ({ match }) => {
  // State for storing product
  const [product, setProduct] = useState({});

  // State for storing related products

  const [related, setRelated] = useState([]);

  // State for storing star rating before sending it to the backend

  const [star, setStar] = useState();
  // Destructure user from redux store
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;


  // Called on mount
  useEffect(() => {
    // if (typeof window !== "undefined" && localStorage.getItem(`star ${slug}`)) {
    //   setStar(JSON.parse( localStorage.getItem(`star ${slug}`) ))
    // }
    loadSingleProduct();

  }, [slug]);

  // Value records and persists here on refresh
  // I can console,kog product.ratings here and see the star value
  // but if I were to console.log(product.ratings.star),
  // I get cannot read property 'star'

  console.log("product fetched after initial mount or update", product.ratings);



  useEffect(() => {
    // Updated ratings can be accessed here as well
    console.log("product in second useEffect", product.ratings);
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        // (ele) => ele.postedBy.toString() === user._id.toString()
        (ele) => ele.postedBy + "" === user._id + ""
        );

        existingRatingObject && setStar(existingRatingObject.star); // current user's star
        // if (typeof window !== "undefined") {

        //   localStorage.setItem( `star ${slug}`, JSON.stringify( star ) );
        // }
      }
    });



    console.log("The value of star is ==> ", star);


    const loadSingleProduct = () => {
      getProduct(slug).then((res) => {
        setProduct(res.data);
        // load related
        getRelated(res.data._id).then((res) => setRelated(res.data));
      });
    };


    // Update component's state
    // make request to backend with the updated new rating
  const onStarClick = (newRating, name) => {
    // Update state with new rating
    setStar(newRating);
    console.table(newRating, name);
    // Make request to backend with the updated star rating
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      // For displaying the updated rating in real time
      loadSingleProduct();
    });
    console.log("Product loaded after rating click", product);
  };

  console.log("Star here is ===>", star); //0

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row mb-3 mt-3 justify-content-center pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} >
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
