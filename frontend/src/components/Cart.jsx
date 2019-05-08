import React, { Component } from "react";
import { connect } from "react-redux";
import ItemList from "./ItemList.jsx";
import CheckoutButton from "./CheckoutButton.jsx";

class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentWillMount = () => {
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
            return;
          }
          cartToStore[item.itemId] = {
            ...cartToStore[item.itemId],
            quantity: cartToStore[item.itemId]["quantity"]
          };
        });
        this.setState({ items: Object.values(cartToStore) });
      });
    //______________________________________
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
let mapStateToProps = state => {
  return { cartItems: state.cart };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
