import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "./ItemList.jsx";

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
      return <div>Invalid Checkout</div>;
    }
    if (this.state.step === 0) {
      console.log("in checkout");
      let cartToItems = this.state.cart.map(item => {
        return item.item;
      });

      return (
        <div>
          <ItemList allItems={cartToItems} />
          <button onClick={this.handlerStepOneButton}>Confirm</button>
        </div>
      );
    }
    if (this.state.step === 1) {
      return (
        <div>
          <h4>enter payment info</h4>
          <p>total: {this.props.total}</p>
          <button onClick={this.handlerStepTwoButton}>Pay</button>
        </div>
      );
    }
    if (this.state.step === 2) {
      let cartToItems = this.state.cart.map(item => {
        return item.item;
      });
      return (
        <div>
          <div>
            <h4>Recipt</h4>
          </div>
          <ItemList allItems={cartToItems} />
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
  return { loggedIn: state.loggedIn, cart: state.cart, total: state.cartTotal };
};
let Checkout = connect(mapStateToProps)(UnconnectedCheckout);
export default Checkout;
