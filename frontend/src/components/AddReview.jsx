import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/addReview.css";

class UnconnectedAddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      rating: 5,
      content: "",
      posted: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("itemId", this.props.itemId);
    data.append("title", this.state.title);
    data.append("rating", this.state.rating);
    data.append("content", this.state.content);

    fetch("/add-review", {
      method: "POST",
      credentials: "include",
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        if (!body.success) {
          console.log(body);
          return;
        }

        console.log(body);
        this.props.dispatch({
          type: "show-message",
          message: "Your rating has been posted!"
        });
        this.setState({
          posted: true
        });
      });
  };

  handleTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleRating = event => {
    let result = parseInt(event.target.value);
    if (isNaN(result)) {
      this.setState({
        rating: 5
      });
      return;
    }
    this.setState({
      rating: result
    });
  };

  handleContent = event => {
    this.setState({
      content: event.target.value
    });
  };

  postedReview = () => {
    return (
      <div className="your-review">
        <div className="review-title">{this.state.title}</div>
        <div className="review-rating">{this.state.rating} stars</div>
        <div className="review-content">{this.state.content}</div>
      </div>
    );
  };

  render = () => {
    if (!this.props.loggedIn) {
      return null;
    }

    if (this.state.posted) {
      return this.postedReview();
    }

    return (
      <div className="your-review">
        <h3 className="write-a-review">Write a review</h3>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <div className="review-label">Title</div>
          <div className="review-flex review-space-between review-top-inputs">
            <div className="review-flex">
              <input
                type="text"
                onChange={this.handleTitle}
                value={this.state.title}
                required={true}
              />
            </div>
            <div className="review-label review-flex review-star-container">
              <select
                className="review-rating"
                value={this.state.rating}
                onChange={this.handleRating}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <span className="review-star">&#11088;</span>
            </div>
          </div>
          <div className="review-label">Content</div>
          <textarea
            className="review-content-input"
            type="text"
            onChange={this.handleContent}
            value={this.state.content}
            required={true}
          />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let AddReview = connect(mapStateToProps)(UnconnectedAddReview);

export default AddReview;
