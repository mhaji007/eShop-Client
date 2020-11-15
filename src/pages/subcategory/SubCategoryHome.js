// Page for displaying all the related products
// based on subcategory
// Used when user clicks on one of the subcategories
// displayed on home page via CategoryList component
// and gets redirected to this page

import React, { useState, useEffect } from "react";
import { getSubcategory } from "../../functions/subcategory";
import ProductCard from "../../components/cards/ProductCard";
import Loader from "../../components/loader/Loader";

const SubCategoryHome = ({ match }) => {
  // State for storing the single subcategory
  const [subcategory, setSubCategory] = useState({});
  // State for storing products that share the same subcategory
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  // Make request to retrieve a subcategory
  // then based on the retrieved subcategory
  // make another request to find
  // products that share the same subcategory
  useEffect(() => {
    setLoading(true);
    // Send slug to detemine which subcategory
    // we want. The slug is pushed onto the url
    // via the link user clicks on in the home page
    getSubcategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      // response from axios call comes back on data
      // subcategory is sent from the back end
      // on the sub
      setSubCategory(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4">
              <Loader/>
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4">
              {products.length} Products in "{subcategory.name}" subcategory
            </h4>
          )}
        </div>
      </div>

      <div className="row  mb-3 justify-content-center">
        {products.map((p) => (
          <div key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryHome;
