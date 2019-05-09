import React, { Component } from "react";
import { connect } from "react-redux";
import Review from "./Review.jsx";

let listElementMaker = reviewData => {
  return <Review data={reviewData} />;
};

class UnconnectedReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = { allReviews: [] };
  }

  isForUserId = () => {
    return this.props.userId !== undefined;
  };

  isForItemId = () => {
    return this.props.itemId !== undefined;
  };

  componentDidMount = () => {
    let queryName = "noName";
    let queryValue = "noValue";

    if (this.isForUserId()) {
      queryName = "userId";
      queryValue = this.props.userId;
    }
    if (this.isForItemId()) {
      queryName = "itemId";
      queryValue = this.props.itemId;
    }
    console.log(queryName + "  " + queryValue);
    fetch("/get-reviews-for-id?" + queryName + "=" + queryValue)
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        let parsedBody = JSON.parse(resBody);

        if (parsedBody.success === false) {
          console.log("There are no reviews yet. ", parsedBody);
          return;
        }

        this.setState({ allReviews: parsedBody });
      });
  };

  render = () => {
    if (this.state.allReviews.length === 0) {
      console.log("Reviews count. ", this.state.allReviews.length);
      return (
        <h3>
          There are no reviews
          {this.isForItemId() ? " for this item " : " by this user "}yet
        </h3>
      );
    }

    return (
      <div>
        <h3>Reviews</h3>
        <div>{this.state.allReviews.map(listElementMaker)}</div>
      </div>
    );
  };
}

let ReviewList = connect()(UnconnectedReviewList);

export default ReviewList;
