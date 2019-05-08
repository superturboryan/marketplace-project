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
    console.log("LOGGED IN: " + this.props.loggedIn);
    if (this.props.cart !== undefined) {
      if (this.props.cart.length) {
        fetch("http://localhost:4000/get-cart", { credentials: "include" })
          .then(res => {
            return res.text();
          })
          .then(resBody => {
            let newCart = JSON.parse(resBody);
            this.props.dispatch({ type: "add-to-cart", item: newCart });
          });
      }
    }
    let cartItemIds = this.props.cart.map(item => {
      if (item === undefined) {
        return undefined;
      }
      return item.itemId;
    });
    cartItemIds = cartItemIds.filter(item => {
      return item !== undefined;
    });
    let data = new FormData();
    cartItemIds.forEach((itemId, index) => {
      data.append("itemIds[]", itemId[index]);
    });
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
