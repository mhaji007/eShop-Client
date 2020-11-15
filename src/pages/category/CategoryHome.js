// Page for displaying all the related products
// based on category
// Used when user clicks on one of the categories
// displayed on home page via CategoryList component
// and gets redirected to this page

import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";

const CategoryHome = ({ match }) => {
  // State for storing the single category
  const [category, setCategory] = useState({});
  // State for storing products that share the same category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    // Send slug to detemine which category
    // we want
    getCategory(slug).then((c) => {
      console.log(JSON.stringify(c.data, null, 4));
      setCategory(c.data);
    });
  }, []);

  return <p>{slug}</p>;
};

export default CategoryHome;
