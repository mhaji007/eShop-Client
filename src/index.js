import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css";
import "./index.css";
// Helps in creating a store
import {createStore} from 'redux';
// Connects the global state store to all components
import {Provider} from 'react-redux';
// Helps in keeping track of redux state in dev tool
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

// Create store
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  // <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);
