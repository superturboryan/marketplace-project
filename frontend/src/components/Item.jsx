import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItem extends Component {
  render = () => {
    console.log("Prop contents: ");
    console.log(this.props);
    return (
      <div>
        <figure className="galleryItem">
          <Link to={"/item/" + this.props.itemId}>
            {" "}
            <div>{this.props.description}</div>{" "}
            <img
              className="galleryImage"
              alt=""
              height="100px"
              src={this.props.imageLocation}
            />{" "}
            <div>${this.props.cost.toLocaleString({ style: "currency" })}</div>
          </Link>
          <Link to={"/profile/" + this.props.sellerId}> Link to seller </Link>
        </figure>
      </div>
    );
  };
}

let Item = connect()(UnconnectedItem);

export default Item;
