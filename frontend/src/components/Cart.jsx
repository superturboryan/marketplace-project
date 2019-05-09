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
        console.log(cartFromServer);
        this.setState({ items: cartFromServer });
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
