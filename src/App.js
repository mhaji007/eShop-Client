import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home';
import Header from './components/nav/Header';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

// Access the currenlty logged in user
import {auth} from './firebase';
// Used for dispatching action and
// payload to update redux store
import {useDispatch} from 'react-redux';




const App = () => {

  const dispatch = useDispatch();

  // Check fire base auth state
  useEffect(() => {

    // Clean up the state after dispatching
    // the action to store to prevent
    // memory leak
    const unsubscribe = auth.onAuthStateChanged(async(user) => {

      if(user) {
        // On the backend we validate this token
        // to make sure it is coming from Firebase
        // and it belongs to user (e.g., when admin
        // attempts to create a new user)
        const idTokenResult = await user.getIdTokenResult();

        // console.log("user", user)

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    });
    return () => unsubscribe();
  }, [])

  return (
    <>
    <Header/>
    <ToastContainer/>
    <Switch>
      <Route path="/"  exact component ={Home}/>
      <Route path="/login" exact component ={Login}/>
      <Route path="/register" exact component ={Register}/>
      <Route path="/forgot/password" exact component ={ForgotPassword}/>
      <Route path="/register/complete" exact component ={RegisterComplete}/>
    </Switch>
    </>
  )
}

export default App;
