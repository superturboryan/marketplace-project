import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "./ItemList.jsx";
import CheckoutButton from "./CheckoutButton.jsx";

class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount = () => {
    console.log("mounted");
    fetch("http://localhost:4000/cart-items")
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        console.log("in then");
        let parsedBody = JSON.parse(resBody);
        this.setState({ items: parsedBody });
      });
  };
  handlerOnClick = () => {};
  render = () => {
    return (
      <div>
        <ItemList allItems={this.state.items} />
        <CheckoutButton />
      </div>
    );
  };
}

let Cart = connect()(UnconnectedCart);
export default Cart;
