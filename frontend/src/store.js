import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "logged-in":
      return { ...state, loggedIn: action.toggle, username: action.username };
    case "show-message":
      return { ...state, message: action.message };
    case "change-number-input-value":
      let inputValueObj = { ...state.inputObj };
      inputValueObj[action.name] = action.value;
      return { ...state, numberInput: { ...inputValueObj } };
    case "add-to-cart":
      return {
        ...state,
        cart: state.cart.concat({
          item: action.item,
          quantity: action.quantity
        })
      };
    case "clear-cart":
      return { ...state, cart: [] };
    case "add-to-cart-total":
      console.log(typeof action.subTotal);
      return {
        ...state,
        cartTotal: state.cartTotal + action.subTotal
      };
    case "reset-cart-total":
      return { ...state, cartTotal: 0 };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    username: "",
    message: "Welcome!",
    numberInput: {},
    cart: [],
    cartTotal: 0
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
