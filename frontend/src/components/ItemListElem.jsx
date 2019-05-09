import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedItemListElem extends Component {
  render = () => {
    console.log(this.props);
    let price = parseInt(this.props.item.price);
    price = "$" + price.toLocaleString({ style: "currency" });
    return (
      <li>
        <div>
          <span>{this.props.item.title}</span>
          <span>{price}</span>
          <span>
            <img
              alt={this.props.item.itemId}
              height="50px"
              src={this.props.item.images[0]}
            />
          </span>
          <span>{this.props.item.quantity}</span>
        </div>
      </li>
    );
  };
}
let ItemListElem = connect()(UnconnectedItemListElem);
export default ItemListElem;
