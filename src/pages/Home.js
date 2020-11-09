import React, { useEffect, useState } from "react";
// import { getProductsByCount } from "../functions/product";
import { getProducts} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);

    getProducts("createdAt", "desc", 3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
    {/* Jumbotron */}
      <div>
        {loading ? <Loader /> : <Jumbotron/>}
      </div>
    {/* New Arrivals Section  */}
      <h4 className="text-center p-3 mt-5 mb-5 display-3 ">
        New Arrivals
      </h4>

      <div >
        {loading ? (
          <LoadingCard count={3} />
        ) : (
        <div className="row m-0 mb-3 justify-content-center ">
          {products.map((product) => (
            <div key={product._id}>

              <ProductCard product={product}/>
            </div>
          ))}
        </div>
         )}
      </div>
    </>
  );
};

export default Home;
