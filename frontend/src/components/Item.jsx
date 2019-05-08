import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItem extends Component {
  render = () => {
    console.log("Prop contents: ");
    console.log(this.props);
    return (
      <div className="galleryItem">
        <Link className="link1" to={"/item/" + this.props.itemId}>
          {" "}
          <div className="galleryItemDescription">
            {this.props.description}
          </div>{" "}
          <figure className="galleryImageContainer">
            <img
              className="gallery__img"
              alt=""
              height="100px"
              src={this.props.imageLocation}
            />
          </figure>{" "}
          <div className="galleryItemCost">
            ${parseFloat(this.props.cost).toLocaleString({ style: "currency" })}
          </div>
        </Link>
        <Link className="link2" to={"/profile/" + this.props.sellerId}>
          {" "}
          Link to seller{" "}
        </Link>
      </div>
    );
  };
}

let Item = connect()(UnconnectedItem);

export default Item;
