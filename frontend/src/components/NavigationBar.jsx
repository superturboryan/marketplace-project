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

  getSignupLogin = () => {
    if (!this.props.loggedIn) {
      return (
        <div className="toTheEnd navigation-unflex" id={"signup-login"}>
          <div className="toTheEnd">
            <span className={"top-top-bar"}>
              <Link to={"/signup"}>Signup</Link>
            </span>
            <span className={"top-top-bar"}>
              {" | "}
              <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </div>
      );
    }
  };

  getUserRelatedLinks = () => {
    return (
      <div className="toTheEnd navigation-unflex">
        <div className="toTheEnd">
          <span className={"top-top-bar"}>{this.props.username + " | "}</span>
          <Link className={"top-top-bar"} to={"/add-item"}>
            Sell Something!
          </Link>
          <span className={"top-top-bar"}>{" | "}</span>
          <Link className={"top-top-bar"} to={"/cart"}>
            <img id={"cart-img"} height={"12px"} src="/assets/cart.png" />
          </Link>
          <Logout className="toTheEnd" />
        </div>
      </div>
    );
  };

  getNavigationLinks = () => {
    return (
      <div className="navigation-flex link-area just-bottom">
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
      <div>
        <div className="above-navigation-bar">
          {this.getSignupLogin()}
          {this.ifLoggedInDoThis(this.getUserRelatedLinks())}
        </div>
        <div className="navigation-bar">
          <div className="navigation-flex">
            <div className="toTheEnd">
              <div />

              <div />
            </div>
          </div>
          <div className="navigation-flex">
            <div id={"ali-bae-div"} className={"ali-bae-heading"}>
              <Link to={"/"}>RockyBay</Link>
            </div>

            <div className="toTheEnd">
              <div id={"search-bar-div"}>
                <Searchbar />
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>

      /*
      <div className="navigation-bar">
        <div className="navigation-flex">
          <div className="navigation-unflex">
            <Link to={"/"}>Ali-Bae</Link>
            <Searchbar />
          </div>

          {this.getSignupLogin()}
          {this.ifLoggedInDoThis(this.getUserRelatedLinks())}
        </div>
        <div className="navigation-left-right">
          {this.getNavigationLinks()}
          {this.ifLoggedInDoThis(<Logout className="toTheEnd" />)}
        </div>
      </div>*/
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
