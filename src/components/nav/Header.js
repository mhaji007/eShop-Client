import React, { useState } from "react";
// Ant Design imports
import { Menu } from "antd";
import {
  HomeOutlined,
  IdcardOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
// Link from react
import { Link } from "react-router-dom";
// Required to implement log out
import firebase from "firebase";
// Used to update redux store on logout
import { useDispatch } from "react-redux";
// Used to access history in non-route components
import { useHistory } from "react-router-dom";

// useDispatch => updating the state
// useSelector => Retrieving data from the state
import { useSelector } from "react-redux";

// Destructure subcomponents
const { SubMenu, Item } = Menu;

// Header component houses the navigation
const Header = () => {
  // Update the active link
  const [current, setCurrent] = useState("home");
  // Used in logout
  const dispatch = useDispatch();
  // Retrieve user from Redux store
  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // Logout
  const logout = () => {
    // Log the user out from
    // Firebase
    firebase.auth().signOut();
    // Log the user out from redux store
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");

    // We cannot access history here
    // like below because
    // Header component is not
    // a route by itself
    // destructing history from
    // props for a component
    // is possible only if
    // said component is a route
    // const Header = ({history}) => {...} X not possible
  };
  // Conditionally render nav links based on user status
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {/* Extract first part of email to display as username */}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {/* Conditionally render submenu items based on user role */}
          {user && user.role === "subscriber" && (
            <Item icon={<IdcardOutlined />}>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item icon={<IdcardOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
