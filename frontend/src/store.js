import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "logged-in":
      return { ...state, loggedIn: action.toggle };
    case "set-number":
      return { ...state, randomNumber: action.number };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    randomNumber: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
