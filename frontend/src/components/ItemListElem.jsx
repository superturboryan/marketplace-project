import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import renderProfile from "./renderProfile";

class UnconnectedItemListElem extends Component {
  render = () => {
    //let price = this.props.item.price;
    //price = "$" + price.toLocaleString({ style: "currency" });
    return (
      <div>
        item
      </div> /*
      <li>
        <div>
          <span>{this.props.item.title}</span>
          <span>{price}</span>
          <span>
            <img height="50px" src={this.props.item.images[0]} />
          </span>
        </div>
      </li>*/
    );
  };
}
let ItemListElem = connect()(UnconnectedItemListElem);
export default ItemListElem;
