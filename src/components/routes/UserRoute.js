import React from "react";
import { Route} from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

// Protected route for users
// For admin users a new layer of protection is needed
// Here user is obtained from the redux store
// But for admin users there is a need for
// a call to the backend (just like the authCheck middleware)
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  // Sometimes empty object might return
  // to safeguard against such cases
  // check for both user and token
  return user && user.token ? (
    // <Route {...rest} render={() => children} />
    <Route {...rest} />
  ) : (
    <LoadingToRedirect/>
  );
};

export default UserRoute;
