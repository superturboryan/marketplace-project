import ReactDOM from "react-dom";
import "./main.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store.js";
import App from "./components/App.jsx";
import ItemDetails from "./components/ItemDetails.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AddItem from "./components/AddItem.jsx";
import AnimatedMessage from "./components/AnimatedMessage.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import renderProfile from "./components/renderProfile.jsx";
import Oops from "./components/Oops.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

let root = (
  <Provider store={store}>
    <BrowserRouter>
      <Route exact={false} path="/" component={NavigationBar} />
      <Route exact={false} path="/" component={AnimatedMessage} />
      <Switch>
        <Route exact={true} path="/(|search|)/" component={App} />
        <Route exact={true} path="/search/:query" component={App} />
        <Route exact={true} path="/item/:id" component={ItemDetails} />
        <Route exact={true} path="/signup" component={Signup} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/add-item" component={AddItem} />
        <Route exact={true} path="/profile/:userId" component={renderProfile} />
        <Route exact={true} path="/cart" component={Cart} />
        <Route exact={true} path="/checkout" component={Checkout} />
        <Route
          render={props => (
            <Oops {...props} message={"This page doesn't exist."} />
          )}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
