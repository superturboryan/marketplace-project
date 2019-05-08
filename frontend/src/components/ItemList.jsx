import React, { Component } from "react";
import { connect } from "react-redux";
import ItemListElem from "./ItemListElem.jsx";

let listElementMaker = itemData => {
  console.log("------------------------------------");

  console.log(itemData.quantity);
  return <ItemListElem item={itemData.item} quantity={itemData.quantity} />;
};

class UnconnectedItemList extends Component {
  render = () => {
    return <ul>{this.props.allItems.map(listElementMaker)}</ul>;
  };
}
let ItemList = connect()(UnconnectedItemList);
export default ItemList;
