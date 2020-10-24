import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  // Sometimes empty object might return
  // to safeguard against such cases
  // check for both user and token
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h1 className="text-danger">Loading...</h1>
  );
};

export default UserRoute;
