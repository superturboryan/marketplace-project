import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedItemListElem extends Component {
  componentDidMount = () => {
    let subtotal = this.props.item.price * this.props.quantity;
    this.props.dispatch({ type: "add-to-cart-total", subTotal: subtotal });
  };
  render = () => {
    console.log(this.props);
    let price = parseInt(this.props.item.price);
    price = "$" + price.toLocaleString({ style: "currency" });
    return (
      <li>
        <div>
          <span>{this.props.item.quantity + " X "}</span>
          <span>{this.props.item.title}</span>
          <span>{price}</span>
          <span>
            <img
              alt={"no image"}
              height="50px"
              src={this.props.item.images[0]}
            />
          </span>

          <span>sub total:</span>
          <span>{this.props.item.price * this.props.quantity}</span>
        </div>
      </li>
    );
  };
}
let ItemListElem = connect()(UnconnectedItemListElem);
export default ItemListElem;
