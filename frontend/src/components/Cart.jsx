import React, { Component } from "react";
import { connect } from "react-redux";
import ItemList from "./ItemList.jsx";
import CheckoutButton from "./CheckoutButton.jsx";

class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount = () => {
    if (this.props.cartItems === undefined) {
      return;
    }
    if (this.props.cartItems.length < 1) {
      return;
    }
    let data = new FormData();
    this.props.cartItems.forEach((item, index) => {
      data.append("cart[]", item.item[index]);
    });
    fetch("http://localhost:4000/cart-items", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        let parsedBody = JSON.parse(resBody);
        if (typeof parsedBody === "object") {
          parsedBody = parsedBody.map(item => {
            return { item, quantity: 0 };
          });
        }

        this.setState({ items: parsedBody });
      });
  };
  handlerOnClick = () => {};
  render = () => {
    return (
      <div>
        <ItemList allItems={this.props.cartItems} />
        <CheckoutButton />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { cartItems: state.cart };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
