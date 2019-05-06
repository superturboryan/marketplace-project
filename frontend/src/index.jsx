import ReactDOM from "react-dom";
import "./main.css";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store.js";
import App from "./components/App.jsx";
import Item from "./components/Item.jsx";

let root = (
  <Provider store={store}>
    <BrowserRouter>
      <Route exact={true} path="/" component={App} />
      <Route exact={true} path="/item/:id" component={Item} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
