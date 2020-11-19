// Component for showing added products to cart
// this component pops up when user clicks on
// Add to cart and goes away when anywhere else
// on page is clicked

import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import noImage from "../../images/noImage.jpg";

// Content of the pop-up drawer
const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>;
};

export default SideDrawer;
