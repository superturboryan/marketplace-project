import React, { Component } from "react";
import { connect } from "react-redux";

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
      <div>
        <h3>{this.state.title}</h3>
        <h4>{this.state.rating} stars</h4>
        <p>{this.state.content}</p>
      </div>
    );
  };

  render = () => {
    if (!this.props.loggedIn) {
      return <Oops message={"You're not signed in!"} />;
    }

    if (this.state.posted) {
      return this.postedReview();
    }

    return (
      <div>
        <h3>Rate:</h3>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <div>Title</div>
          <input
            type="text"
            onChange={this.handleTitle}
            value={this.state.title}
          />
          <div>Rating</div>
          <select
            value={this.state.rating}
            onChange={this.UNSAFE_componentWillMount.handleRating}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div>Content</div>
          <input
            type="text"
            onChange={this.handleDescription}
            value={this.state.description}
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
