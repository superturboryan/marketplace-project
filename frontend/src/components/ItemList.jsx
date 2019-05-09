import React, { Component } from "react";
import { connect } from "react-redux";
import ItemListElem from "./ItemListElem.jsx";

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
      <div>
        <ul>{this.props.allItems.map(listElementMaker)}</ul>
        <span>Total:</span>
        <span>{this.props.total}</span>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { total: state.cartTotal };
};
let ItemList = connect(mapStateToProps)(UnconnectedItemList);
export default ItemList;
