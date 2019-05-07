import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { initialItems, itemReviews } from "./../dummyData.js";

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
        <Link to={"/item/" + item.id}>
          <div>{item.description}</div>{" "}
          {item.images.map((val, index) => {
            return <img alt="" height="200px" src={item.images[index]} />;
          })}
        </Link>{" "}
        {/* look for the to local string thingy for $ */}
        <div>{item.price}$</div>
        <div>{item.stock} in stock.</div>
        <Link to={"/seller/" + item.sellerId}> Link to seller </Link>
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
