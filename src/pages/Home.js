import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);

    getProductsByCount(20).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="jumbotron">
        {loading ? <Loader /> : <h4> All Products </h4>}
      </div>
      <div className="container">
        <div className="row  justify-content-center ">
          {products.map((product) => (
            <div key={product._id}>

              <ProductCard product={product}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
