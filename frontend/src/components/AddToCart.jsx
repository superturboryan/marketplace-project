import React, { Component } from "react";
import { connect } from "react-redux";
import NumberInput from "./NumberInput.jsx";

// let isQuantityMax = quantity => {
//   let quantityStr = quantity + "";
//   if (quantity.length > 6) {
//   }
// };

class UnconnectedAddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
  }
  handlerButtonAddToCart = () => {
    if (!this.props.loggedIn) {
      console.log("user needs to be logged in");
      return;
    }
    let itemQuantity = this.props.numberInputValues[this.props.item.itemId];

    let data = new FormData();
    data.append("itemId", this.props.item.itemId);
    data.append("itemId", itemQuantity);

    fetch("http://localhost:4000/set-cart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    this.props.dispatch({
      type: "add-to-cart",
      item: this.props.item,
      quantity: this.props.numberInputValues[this.props.item.itemId]
    });
  };
  render = () => {
    return (
      <div>
        <NumberInput name={this.props.item.itemId} />
        <button onClick={this.handlerButtonAddToCart}>Add to Cart</button>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    cart: state.cart,
    numberInputValues: state.numberInput,
    loggedIn: state.loggedIn
  };
};
let AddToCart = connect(mapStateToProps)(UnconnectedAddToCart);
export default AddToCart;
