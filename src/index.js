import "./assets/css/style.css";
import "./assets/css/default.css";
import "./assets/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import AppI18n from "./AppI18n";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppI18n />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
