import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/subcategory/SubCreate";
import SubUpdate from "./pages/admin/subcategory/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategoryHome from "./pages/subcategory/SubCategoryHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
// SideDrawer should be accessible across
// all pages that is why it is imported here in App
import SideDrawer from "./components/drawer/SideDrawer";



// Access the currenlty logged in user
import { auth } from "./firebase";
// Used for dispatching action and
// payload to update redux store
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  // Check fire base auth state
  useEffect(() => {
    // Clean up the state after dispatching
    // the action to store to prevent
    // memory leak
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // If the expression if(user) returns true
      // this indicates that we already have access to user informaiton
      // in the database because we have already made a request
      // to the create-or-update endpoint
      // therefore instead of making request to create-or-update
      // user on each request we can simply retrieve the current
      // user information from the database
      if (user) {
        // On the backend we validate this token
        // to make sure it is coming from Firebase
        // and it belongs to user (e.g., when admin
        // attempts to create a new user)
        const idTokenResult = await user.getIdTokenResult();

        // console.log("user", user)

        // dispatch({
        //   type: 'LOGGED_IN_USER',
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token
        //   }
        // })

        // Make request to backend to
        // get current user's information
        // on state change
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              // payload values here,
              // aside from email and
              // token directly obtained
              // via firebase,
              // will not persist on
              // refresh. Therefore there
              // is a need for another endpoint
              // to retrieve current user info
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // the onAuthStateChanged() function returns
    // the unsubscribe function for the observer.
    // Once it fetch user from firebase,
    // it returns (cleanup) so no more calls to firebase is made.
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <SideDrawer/>
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
        <AdminRoute
          path="/admin/category/:slug"
          exact
          component={CategoryUpdate}
        />
        <AdminRoute path="/admin/subcategory" exact component={SubCreate} />
        <AdminRoute
          path="/admin/subcategory/:slug"
          exact
          component={SubUpdate}
        />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute path="/admin/products" exact component={AllProducts} />
        <AdminRoute
          path="/admin/product/:slug"
          exact
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subcategory/:slug" component={SubCategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </>
  );
};

export default App;
