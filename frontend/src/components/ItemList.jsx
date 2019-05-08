import React, { Component } from "react";
import { connect } from "react-redux";
import ItemListElem from "./ItemListElem.jsx";

let listElementMaker = itemData => {
  return <ItemListElem item={itemData.item} quantity={itemData.quantity} />;
};

class UnconnectedItemList extends Component {
  render = () => {
    console.log("LKIST");
    console.log(this.props.item);
    return <ul>{this.props.allItems.map(listElementMaker)}</ul>;
  };
}
let ItemList = connect()(UnconnectedItemList);
export default ItemList;
