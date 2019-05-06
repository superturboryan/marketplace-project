import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        This is App!
        <div>
          <Link to={"/item/1234"}>To item id 1234</Link>
        </div>
        <div>
          <Link to={"/item/5678"}>To item id 5678</Link>
        </div>
        <div>
          <Link to={"/signup"}>Signup</Link>
        </div>
        <div>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);

export default App;
