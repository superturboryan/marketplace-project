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
    //______________________________________

    fetch("http://localhost:4000/get-cart", { credentials: "include" })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        let cartFromServer = JSON.parse(resBody);
        let cartToStore = {};
        cartFromServer.forEach(item => {
          if (cartToStore[item.itemId] === undefined) {
            cartToStore[item.itemId] = { item: item, quantity: 1 };
          }
          cartToStore[item.itemId] = {
            ...cartToStore[item.itemId],
            quantity: cartToStore[item.itemId]["quantity"] + 1
          };
        });
        console.log(cartToStore);
      });

    //______________________________________
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
        if (typeof parsedBody === "array") {
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
