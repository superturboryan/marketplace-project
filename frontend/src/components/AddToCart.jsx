import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import renderProfile from "./renderProfile";
import NumberInput from "./NumberInput.jsx";

let isQuantityMax = quantity => {
  let quantityStr = quantity + "";
  if (quantity.length > 6) {
  }
};

class UnconnectedAddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
  }
  handlerButtonAddToCart = () => {
    this.props.dispatch({
      type: "add-to-cart",
      itemId: this.props.itemId,
      valueName: this.props.itemId
    });
  };
  render = () => {
    return (
      <div>
        <NumberInput name={this.props.itemId} />
        <button onClick={this.handlerButtonAddToCart}>Add to Cart</button>
      </div>
    );
  };
}
let AddToCart = connect()(UnconnectedAddToCart);
export default AddToCart;
