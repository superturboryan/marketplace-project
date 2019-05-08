import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, BrowserRouter } from "react-router-dom";
class UnconnectedCheckoutButton extends Component {
  render = () => {
    return <Link to={"/Checkout"}>CheckOut!</Link>;
  };
}
let CheckoutButton = connect()(UnconnectedCheckoutButton);

export default CheckoutButton;
