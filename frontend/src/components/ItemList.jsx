import React, { Component } from "react";
import { connect } from "react-redux";
import ItemListElem from "./ItemListElem.jsx";
import "./../css/itemList.css";

let listElementMaker = itemData => {
  return <ItemListElem item={itemData} quantity={itemData.quantity} />;
};

class UnconnectedItemList extends Component {
  componentWillMount = () => {
    this.props.dispatch({ type: "reset-cart-total" });
  };
  render = () => {
    console.log("itemlist item");
    console.log(this.props.allItems);
    return (
      <div className="itemList-container">
        <div className="itemList-items-container">
          {this.props.allItems.map(listElementMaker)}
        </div>
        <hr />
        <div className="itemList-total-info">
          <div className="itemList-total-text">Total:</div>
          <div className="itemList-total-text-data">{this.props.total}</div>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { total: state.cartTotal };
};
let ItemList = connect(mapStateToProps)(UnconnectedItemList);
export default ItemList;
