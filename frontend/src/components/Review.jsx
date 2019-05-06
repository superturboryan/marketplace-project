import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedReview extends Component {
  render = () => {
    return (
      <div>
        <div>
          <span>
            <h4>{this.props.data.title}</h4>
          </span>
          <span>
            <p>{this.props.data.rating}</p>
          </span>
        </div>
        <p>{this.props.data.content}</p>
        <Link to={"/profile/" + this.props.data.userId}>
          {this.props.data.username}
        </Link>
      </div>
    );
  };
}
let Review = connect()(UnconnectedReview);
export default Review;
