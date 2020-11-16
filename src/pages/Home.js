import React, { useEffect, useState } from "react";
// import { getProductsByCount } from "../functions/product";
import { getProducts, getProductsCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/loader/Loader";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";
import styles from "./Home.module.scss";
import { Pagination } from "antd";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/subcategory/SubCategoryList";
import classnames from "classnames";

const Home = () => {
  const [arrivals, setArrivals] = useState([]);
  const [arrivalsPage, setArrivalsPage] = useState(1);
  const [arrivalsProductsCount, setArrivalsProductsCount] = useState(0);

  const [bestSellers, setBestSellers] = useState([]);
  const [bestSellersPage, setBestSellersPage] = useState(1);
  const [bestSellersCount, setBestSellersCount] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllArrivalsProducts();
  }, [arrivalsPage]);

  const loadAllArrivalsProducts = () => {
    setLoading(true);

    getProducts("createdAt", "desc", arrivalsPage).then((res) => {
      setArrivals(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAllBestSellersProducts();
  }, [bestSellersPage]);

  const loadAllBestSellersProducts = () => {
    setLoading(true);

    getProducts("sold", "desc", bestSellersPage).then((res) => {
      setBestSellers(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProductsCount().then((res) => setArrivalsProductsCount(res.data));
    getProductsCount().then((res) => setBestSellersCount(res.data));
  }, []);

  return (
    <>
      {/* Jumbotron */}
      <div>{loading ? <Loader /> : <Jumbotron />}</div>
      {/* New Arrivals Section  */}
      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 ">New Arrivals</h4> */}

      <div className="text-center p-3 mt-2 mb-3 display-4">
        <h4 className={styles.title}>
          <div>
            <span>New Arrivals</span>
          </div>
        </h4>
      </div>


      <div>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row m-0 mb-3 justify-content-center ">
            {arrivals.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination
        className="row m-0 mb-3 justify-content-center"
        current={arrivalsPage}
        total={(arrivalsProductsCount / 3) * 10}
        onChange={(value) => setArrivalsPage(value)}
      />

      {/* Best sellers Section  */}

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 ">Best Sellers</h4> */}


      <div className="text-center p-3 mt-2 mb-3 display-4">
        <h4 className={styles.title}>
          <div>
            <span>Best Sellers</span>
          </div>
        </h4>
      </div>


      <div>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row m-0 mb-3 justify-content-center ">
            {bestSellers.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination
        className="row m-0 mb-5 justify-content-center"
        current={bestSellersPage}
        total={(bestSellersCount / 3) * 10}
        onChange={(value) => setBestSellersPage(value)}
      />

      <div className="text-center p-3 mt-2 mb-3 display-4">
        <h4 className={styles.title}>
          <div>
            <span>Categories</span>
          </div>
        </h4>
      </div>

      <CategoryList />

      {/* <h4 className="text-center p-3 mt-2 mb-3 display-4">SubCategories</h4> */}
      <div className="text-center p-3 mt-2 mb-3 display-4">
        <h4 className={styles.title}>
          <div>
            <span>SubCategories</span>
          </div>
        </h4>
      </div>
      <SubCategoryList />
    </>
  );
};

export default Home;
