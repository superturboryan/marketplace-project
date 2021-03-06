import React, { Component } from "react";
import { connect } from "react-redux";
import ItemList from "./ItemList.jsx";
import CheckoutButton from "./CheckoutButton.jsx";
import "./../css/cart.css";

class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  clearCart = () => {
    fetch("/clear-cart", { credentials: "include" }).then(
      this.props.dispatch({ type: "clear-cart" })
    );
    this.setState({ items: [] });
  };

  componentWillMount = () => {
    //______________________________________

    fetch("/get-cart", { credentials: "include" })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        let cartFromServer = JSON.parse(resBody);
        console.log("cartFromServer");
        console.log(cartFromServer);
        this.setState({ items: cartFromServer });
        this.props.dispatch({ type: "clear-cart" });
        cartFromServer.forEach(item => {
          this.props.dispatch({
            type: "add-to-cart",
            item: item,
            quantity: item.quantity
          });
        });
      });
    //______________________________________
  };
  handlerOnClick = () => {};
  render = () => {
    return (
      <div className="cart-container">
        <ItemList allItems={this.state.items} />
        <div className="cart-buttons">
          <button onClick={this.clearCart}>Clear cart!</button>
          <button>
            {" "}
            <CheckoutButton />{" "}
          </button>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { cartItems: state.cart };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
