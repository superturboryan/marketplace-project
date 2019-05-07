import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { initialItems, itemReviews } from "./../dummyData.js";
<<<<<<< HEAD
import AddToCart from "./AddToCart.jsx";
=======
import AddReview from "./AddReview.jsx";
>>>>>>> 7d037eb9e9914538d665b8f1a05c28e1e16af560

class UnconnectedItem extends Component {
  render() {
    console.log("ItemDetailsCompenent pros: ");
    console.log(this.props.match.params.id);
    let item = initialItems.find(item => {
      return item.id === this.props.match.params.id;
    });
    return (
      <div>
        {" "}
        <div>{item.description}</div>{" "}
        {/* Replace with new multiple image compnent */}
        {item.images.map((val, index) => {
          return <img alt="" height="200px" src={item.images[index]} />;
        })}
        {/* **************************************** */}{" "}
        <div>${item.price.toLocaleString({ style: "currency" })}</div>
        <div>{item.stock} in stock.</div>
<<<<<<< HEAD
        <Link to={"/seller/" + item.sellerId}> Link to seller </Link>
        <div>
          <AddToCart item={item} />
        </div>
=======
        <Link to={"/profile/" + item.sellerId}> Link to seller </Link>
        <AddReview itemId={item.id} />
>>>>>>> 7d037eb9e9914538d665b8f1a05c28e1e16af560
        <div>Reviews: </div>
        <div>
          {itemReviews.map(review => {
            if (review.itemID === item.id) {
              return (
                <div>{review.reviewString + " rating: " + review.rating}</div>
              );
            }
            return <div />;
          })}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {};
};

let ItemDetails = connect(mapStateToProps)(UnconnectedItem);

export default ItemDetails;
