import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/tabbedImageGallery.css";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedImage: "",
      style: { height: "35%", display: "block" }
    };
    console.log("Initial Tabbed Gallery state: ");
    console.log(this.state);
  }

  handleClick = index => {
    this.setState({
      expandedImage: this.props.images[index],
      style: { height: "35%", display: "block" }
    });
    console.log("Image clicked. State set for selected image");
    //console.log(this.state);
  };

  resetState = () => {
    this.setState({ expandedImage: "" });
    console.log("X clicked. State reset for expandedImage");
    //console.log(this.state);
  };

  bigDisplay = () => {
    if (this.state.expandedImage !== "") {
      return (
        <div className="expandedImgContainer">
          <span onClick={this.resetState} className="closebtn">
            {/* &times; actually gives an X in the corner of the image */}
            &times;
          </span>
          <img
            alt="Expanded"
            id="expandedImg"
            style={this.state.style}
            src={this.state.expandedImage}
          />
        </div>
      );
    }
  };

  renderImage = index => {
    return (
      <div key={index}>
        <img
          className="imgColumn"
          alt={this.props.title + "_image"}
          height="150px"
          src={this.props.images[index]}
          onClick={() => this.handleClick(index)}
        />
      </div>
    );
  };

  render = () => {
    return (
      <div className="tabbed-gallery-container">
        <div className="imgRow" id="scrollmenu">
          {this.props.images.map((val, index) => {
            return this.renderImage(index);
          })}
        </div>
        {this.bigDisplay()}
      </div>
    );
  };
}

let TabbedImageGallery = connect()(UnconnectedItem);

export default TabbedImageGallery;
