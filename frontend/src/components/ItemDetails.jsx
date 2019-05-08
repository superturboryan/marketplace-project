import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AddToCart from "./AddToCart.jsx";
import AddReview from "./AddReview.jsx";
import ReviewList from "./ReviewList.jsx";
import TabbedImageGallery from "./TabbedImageGallery.jsx";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
      reviews: []
    };
    console.log("Initial state: ");
    console.log(this.state);
  }

  componentDidMount = () => {
    // Fetch item details from server
    fetch("/get-single-item?itemId=" + this.getItemId())
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        if (body.success === false) {
          console.log("Item does not exist.", body);
          return;
        }

        console.log("Received item details: ", body);
        this.setState({
          item: body
        });
      });

    // Fetch item reviews from server
    fetch("/get-reviews-for-id?itemId=" + this.getItemId())
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        if (body.success === false) {
          console.log("Reviews could not be retrieved.");
          return;
        }

        console.log("Received item reviews: ", body);
        this.setState({
          reviews: body
        });
      });
  };

  getItemId = () => {
    let temp = this.props.location.pathname;
    return temp.substring(temp.lastIndexOf("/") + 1);
  };

  render() {
    console.log("ItemDetailsCompenent props: ");
    console.log(this.props.match.params.id);

    let itemReviews = this.state.reviews;

    if (this.state.item === undefined) {
      return null;
    }

    if (itemReviews.count === 0) {
      itemReviews = <div>This item has not been reviewed yet.</div>;
    } else {
      itemReviews = <ReviewList itemId={this.state.item.itemId} />;
    }

    return (
      <div>
        {" "}
        <div>{this.state.item.description}</div>{" "}
        <TabbedImageGallery
          images={this.state.item.images}
          itemId={this.state.item.id}
          title={this.state.item.title}
        />{" "}
        <div>
          ${this.state.item.price.toLocaleString({ style: "currency" })}
        </div>
        <div>{this.state.item.stock} in stock.</div>
        <Link to={"/profile/" + this.state.item.sellerId}>
          {" "}
          Link to seller{" "}
        </Link>
        <AddToCart item={this.state.item} />
        <AddReview itemId={this.state.item.id} />
        {itemReviews}
      </div>
    );
  }
}

let ItemDetails = connect()(UnconnectedItem);

export default withRouter(ItemDetails);
