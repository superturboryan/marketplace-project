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
    data.append("quantity", itemQuantity);

    fetch("/set-cart", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        let parsedBody = JSON.parse(resBody);
        if (parsedBody.success === true) {
          this.props.dispatch({
            type: "add-to-cart",
            itemId: this.props.item,
            quantity: this.props.numberInputValues[this.props.item.itemId]
          });
          this.props.dispatch({
            type: "show-message",
            message: "Added to cart."
          });
        }
        if (parsedBody.success === false) {
          alert("not enough in stock");
        }
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
