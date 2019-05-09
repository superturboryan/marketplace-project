import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "./ItemList.jsx";
import Oops from "./Oops.jsx";

class UnconnectedCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 0, cart: [] };
  }
  componentDidMount = () => {
    this.setState({ cart: this.props.cart });
  };
  handlerStepOneButton = () => {
    console.log(this.state.step);
    if (this.state.step === 0) {
      this.setState({ step: this.state.step + 1 });
    }
  };
  handlerStepTwoButton = () => {
    console.log(this.state.step);
    if (this.state.step === 1) {
      fetch("/clear-cart", { credentials: "include" })
        .then(res => {
          return res.text();
        })
        .then(resBody => {
          this.props.dispatch({ type: "clear-cart" });
        });
    }
    this.setState({ step: this.state.step + 1 });
  };
  renderSwitch = () => {
    if (this.state.cart.length < 1) {
      return <Oops message="An error occurred." />;
    }
    if (this.state.step === 0) {
      console.log("in checkout");
      let cartToItems = this.state.cart.map(item => {
        return item.item;
      });

      return (
        <div className="cart-container">
          <ItemList allItems={cartToItems} />
          <div className="cart-buttons">
            <button onClick={this.handlerStepOneButton}>Confirm</button>
          </div>
        </div>
      );
    }
    if (this.state.step === 1) {
      return (
        <div className="checkout-payment-container">
          <h4 className="checkout-instructions">Enter payment info</h4>
          <p className="checkout-total-text">
            Total:{" "}
            <span className="checkout-total">
              $
              {parseFloat(this.props.total).toLocaleString({
                style: "currency"
              })}
            </span>
          </p>
          <div className="cart-buttons">
            <button onClick={this.handlerStepTwoButton}>Pay</button>
          </div>
        </div>
      );
    }
    if (this.state.step === 2) {
      let cartToItems = this.state.cart.map(item => {
        return item.item;
      });
      return (
        <div className="cart-container">
          <h4 className="checkout-receipt-text">Receipt</h4>
          <ItemList allItems={cartToItems} />
          <div className="checkout-return">
            <Link to={"/"}>Return to homepage</Link>
          </div>
        </div>
      );
    }
    return <Oops message="An error occurred. Are you logged in?" />;
  };
  render = () => {
    return this.renderSwitch();
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn, cart: state.cart, total: state.cartTotal };
};
let Checkout = connect(mapStateToProps)(UnconnectedCheckout);
export default Checkout;
