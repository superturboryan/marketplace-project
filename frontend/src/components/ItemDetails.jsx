import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { initialItems, itemReviews } from "./../dummyData.js";
import AddReview from "./AddReview.jsx";
import TabbedImageGallery from "./TabbedImageGallery.jsx";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: initialItems.find(item => {
        return item.id === this.props.match.params.id;
      })
    };
    console.log("Initial state: ");
    console.log(this.state);
  }

  render() {
    console.log("ItemDetailsCompenent props: ");
    console.log(this.props.match.params.id);

    return (
      <div>
        {" "}
        <div>{this.state.item.description}</div>{" "}
        {/* Replace with new multiple image compnent */}
        {/*}
        {item.images.map((val, index) => {
          return <img alt="" height="200px" src={item.images[index]} />;
        })}
      */}
        {/* **************************************** */}
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
        <AddReview itemId={this.state.item.id} />
        <div>Reviews: </div>
        <div>
          {itemReviews.map(review => {
            if (review.itemID === this.state.item.id) {
              console.log(this.state.item.id + review.reviewerId);
              return (
                <div key={this.state.item.id + review.reviewerId}>
                  {review.reviewString + " rating: " + review.rating}
                </div>
              );
            }
            return "";
          })}
        </div>
      </div>
    );
  }
}

let ItemDetails = connect()(UnconnectedItem);

export default ItemDetails;
