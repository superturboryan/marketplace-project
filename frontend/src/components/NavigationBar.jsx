import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";
import "./../css/navigationBar.css";

class UnconnectedNavigationBar extends Component {
  getButtonHtml = () => {
    if (this.props.loggedIn) {
      return (
        <div>
          <div>
            <Logout />
          </div>
          <div>
            <Link to={"/add-item"}>Sell Something!</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Link to={"/signup"}>Signup</Link>
          </div>
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div className="navigation-bar">
        <div>
          <Link to={"/"}>Ali-Bae</Link>
          <Link to={"/cart"}>My Cart</Link>
        </div>
        {this.getButtonHtml()}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let NavigationBar = connect(mapStateToProps)(UnconnectedNavigationBar);

export default NavigationBar;
