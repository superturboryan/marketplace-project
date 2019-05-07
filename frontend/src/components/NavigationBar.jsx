import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/navigationBar.css";

class UnconnectedNavigationBar extends Component {
  render = () => {
    return <div className="navigation-bar">HELLO</div>;
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let NavigationBar = connect(mapStateToProps)(UnconnectedNavigationBar);

export default NavigationBar;
