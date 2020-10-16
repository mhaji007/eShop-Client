import React from "react";
import {Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home';
import Header from './components/nav/Header';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from './pages/auth/RegisterComplete';

const App = () => {
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
