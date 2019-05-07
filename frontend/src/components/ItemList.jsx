import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import renderProfile from "./renderProfile";
import ItemListElem from "./ItemListElem.jsx";

let listElementMaker = itemData => {
  return <ItemListElem item={itemData} />;
};

class UnconnectedItemList extends Component {
  render = () => {
    return <ul>{this.props.allItems.map(listElementMaker)}</ul>;
  };
}
let ItemList = connect()(UnconnectedItemList);
export default ItemList;
