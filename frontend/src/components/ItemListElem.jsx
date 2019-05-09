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
    let subtotal =
      "$" +
      (this.props.item.price * this.props.quantity).toLocaleString({
        style: "currency"
      });
    return (
      <div className="itemListElem-container">
        <img alt={""} src={this.props.item.images[0]} />
        <div>
          <div className="itemListElem-title">{this.props.item.title}</div>
          <hr />
          <fieldset>
            <dl>
              <dt>Quantity</dt>
              <dd>{this.props.item.quantity}</dd>
            </dl>
            <dl>
              <dt>Price</dt>
              <dd>{price}</dd>
            </dl>
            <dl>
              <dt>Subtotal</dt>
              <dd>{subtotal}</dd>
            </dl>
          </fieldset>
        </div>
      </div>
    );
  };
}
let ItemListElem = connect()(UnconnectedItemListElem);
export default ItemListElem;
