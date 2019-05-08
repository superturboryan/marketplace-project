import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "logged-in":
      return { ...state, loggedIn: action.toggle };
    case "show-message":
      return { ...state, message: action.message };
    case "change-number-input-value":
      let inputValueObj = { ...state.inputObj };
      inputValueObj[action.name] = action.value;
      return { ...state, numberInput: { ...inputValueObj } };
    case "add-to-cart":
      console.log(action.quantity + "   quantity");
      return {
        ...state,
        cart: state.cart.concat({
          item: action.item,
          quantity: action.quantity
        })
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    message: "Welcome!",
    numberInput: {},
    cart: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
