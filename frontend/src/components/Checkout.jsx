import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "./ItemList.jsx";
import CheckoutButton from "./CheckoutButton.jsx";

class UnconnectedCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 };
  }
  handlerStepOneButton = () => {
    console.log(this.state.step);
    if (this.state.step === 0) {
      this.setState({ step: this.state.step + 1 });
    }
  };
  handlerStepTwoButton = () => {
    console.log(this.state.step);
    if (this.state.step === 1) {
      this.setState({ step: this.state.step + 1 });
    }
  };
  renderSwitch = () => {
    if (this.props.cart.length < 1) {
      return <div>your cart is empty</div>;
    }
    if (this.state.step === 0) {
      return (
        <div>
          <ItemList allItems={this.props.cart} />
          <button onClick={this.handlerStepOneButton}>Confirm</button>
        </div>
      );
    }
    if (this.state.step === 1) {
      return (
        <div>
          <h4>enter payment info</h4>
          <button onClick={this.handlerStepTwoButton}>Pay</button>
        </div>
      );
    }
    if (this.state.step === 2) {
      return (
        <div>
          <h4>Recipt</h4>
          <Link to={"/"}>Return to homepage</Link>
        </div>
      );
    }
    return <p>invalid checkout step</p>;
  };
  render = () => {
    return this.renderSwitch();
  };
}
let mapStateToProps = state => {
  return { cart: state.cart };
};
let Checkout = connect(mapStateToProps)(UnconnectedCheckout);
export default Checkout;
