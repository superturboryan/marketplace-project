import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class UnconnectedReview extends Component {
  getStars = () => {
    let stars = [];
    for (let i = 0; i < this.props.data.rating; i++) {
      stars.push(i);
    }
    return (
      <div className="review-rating review-rating-spacer">
        {stars.map(star => {
          return <span className="review-star">&#11088;</span>;
        })}
      </div>
    );
  };

  getCorrectLink = () => {
    console.log(this.props.location.pathname);
    let str = this.props.location.pathname;
    //  returns item or profile
    str = str.substring(1, str.lastIndexOf("/"));

    if (str === "item") {
      return (
        <Link to={"/profile/" + this.props.data.userId}>
          — {this.props.data.username}
        </Link>
      );
    } else if (str === "profile") {
      return (
        <Link to={"/item/" + this.props.data.itemId}>
          <span>Review for </span>
          {this.props.data.item[0].title}
        </Link>
      );
    } else {
      return null;
    }
  };

  render = () => {
    console.log("props data: ", this.props);
    return (
      <div className="your-review-mini">
        <div className="review-flex">
          <div className="review-title">"{this.props.data.title}"</div>
          {this.getStars()}
        </div>
        <div className="review-content-mini">{this.props.data.content}</div>
        <div className="review-seller-link">{this.getCorrectLink()}</div>
      </div>
    );
  };
}
let Review = connect()(UnconnectedReview);
export default withRouter(Review);
