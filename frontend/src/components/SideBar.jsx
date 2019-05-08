import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./../css/sideBar.css";

class UnconnectedSideBar extends Component {
  render = () => {
    return (
      // change classname to side bar if needed...
      <div className="side-bar">
        Categories:
        <div>Clothing and Accessories</div>
        <div>Films and Music</div>
        <div>Home and Appliances</div>
        <div>TV and Electronics</div>
        <div>Video Games</div>
        {/* <Link className="link2" to={"/search/:" + this.props.sellerId} />
        <Link className="link2" to={"/search/:" + this.props.sellerId} />
        <Link className="link2" to={"/search/:" + this.props.sellerId} />
        <Link className="link2" to={"/search/:" + this.props.sellerId} />
        <Link className="link2" to={"/search/:" + this.props.sellerId} /> */}
      </div>
    );
  };
}

let SideBar = connect()(UnconnectedSideBar);

export default SideBar;
