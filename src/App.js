import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home';
import Header from './components/nav/Header';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from './pages/auth/RegisterComplete';

// Access the currenlty logged in user
import {auth} from './firebase';
// Used for dispatching action and
// payload to update redux store
import {useDispatch} from 'react-redux';




const App = () => {

  const dispatch = useDispatch();

  // Check fire base auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();

        console.log("user", user)

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
      <Route path="/register/complete" exact component ={RegisterComplete}/>
    </Switch>
    </>
  )
}

export default App;
