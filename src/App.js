import React from "react";
import {Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home';


const App = () => {
  return (
    <Switch>
      <Route path="/"  exact component ={Home}/>
      <Route path="/login" exact component ={Login}/>
      <Route path="/register" exact component ={Register}/>
    </Switch>
  )
}

export default App;
