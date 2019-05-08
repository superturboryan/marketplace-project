import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "./ItemList.jsx";
import CheckoutButton from "./CheckoutButton.jsx";

class UnconnectedAutoLogin {
  componentDidMount = () => {
    fetch("http://localhost:4000/verify-cookie", { credentials: "include" })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        parsedBody = JSON.parse(resBody);
        if (typeof parsedBody !== "object") {
          console.log("autologin fetch needs to return an object");
        }
        if (parsedBody.success === true) {
          this.props.dispatch({ action: "logged-in", toggle: true });
        }
      });
  };
  render = () => {
    return null;
  };
}
mapStateToProps = state => {};
AutoLogin = connect()(UnconnectedAutoLogin);
export default AutoLogin;
