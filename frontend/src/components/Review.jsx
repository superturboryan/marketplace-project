import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

  render = () => {
    return (
      <div className="your-review-mini">
        <div className="review-flex">
          <div className="review-title">"{this.props.data.title}"</div>
          {this.getStars()}
        </div>
        <div className="review-content-mini">{this.props.data.content}</div>
        <div className="review-seller-link">
          <Link to={"/profile/" + this.props.data.userId}>
            — {this.props.data.username}
          </Link>
        </div>
      </div>
    );
  };
}
let Review = connect()(UnconnectedReview);
export default Review;
