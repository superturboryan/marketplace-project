import React, { Component } from "react";
import { connect } from "react-redux";
import Review from "./Review.jsx";

let listElementMaker = reviewData => {
  return (
    <li>
      <Review data={reviewData} />
    </li>
  );
};

class UnconnectedReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = { allReviews: [] };
  }
  componentDidMount = () => {
    let queryName = "noName";
    let queryValue = "noValue";

    if (this.props.userId !== undefined) {
      queryName = "userId";
      queryValue = this.props.userId;
    }
    if (this.props.itemId !== undefined) {
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
      return <h3>There are no reviews for this item yet.</h3>;
    }

    return (
      <div>
        <h3>Reviews</h3>
        <ul>{this.state.allReviews.map(listElementMaker)}</ul>
      </div>
    );
  };
}
let ReviewList = connect()(UnconnectedReviewList);

export default ReviewList;
