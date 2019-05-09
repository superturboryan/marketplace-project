import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";
import Searchbar from "./Searchbar.jsx";
import "./../css/navigationBar.css";

class UnconnectedNavigationBar extends Component {
  ifLoggedInDoThis = returnThis => {
    if (this.props.loggedIn) {
      return returnThis;
    }
  };

  getButtonHtml = () => {
    if (!this.props.loggedIn) {
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

  getNavigationLinks = () => {
    return (
      <div className="navigation-flex link-area">
        Categories:
        <div>Clothing and Accessories</div>
        <div>Films and Music</div>
        <div>Home and Appliances</div>
        <div>Electronics</div>
        <div>Video Games</div>
      </div>
    );
  };

  render = () => {
    return (
      <div className="navigation-bar">
        <div className="navigation-flex">
          <div className="navigation-unflex">
            <Link to={"/"}>Ali-Bae</Link>
          </div>
          <Searchbar />
          {this.getButtonHtml()}
          {this.ifLoggedInDoThis(
            <div className="toTheEnd navigation-unflex">
              <div>
                <span>{this.props.username + " |"}</span>
                <Link to={"/cart"}>My Cart</Link>
              </div>
              <Link className="toTheEnd" to={"/add-item"}>
                Sell Something!
              </Link>
              {this.getNavigationLinks()}
              {this.ifLoggedInDoThis(<Logout className="toTheEnd" />)}
            </div>
          )}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    username: state.username
  };
};

let NavigationBar = connect(mapStateToProps)(UnconnectedNavigationBar);

export default NavigationBar;
