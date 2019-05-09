import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AddToCart from "./AddToCart.jsx";
import AddReview from "./AddReview.jsx";
import ReviewList from "./ReviewList.jsx";
import TabbedImageGallery from "./TabbedImageGallery.jsx";
import "./../css/itemDetails.css";

class UnconnectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: undefined
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
  };

  getItemId = () => {
    let temp = this.props.location.pathname;
    return temp.substring(temp.lastIndexOf("/") + 1);
  };

  render() {
    console.log("ItemDetailsCompenent props: ");
    console.log(this.props.match.params.id);

    if (this.state.item === undefined) {
      return null;
    }

    return (
      <div className="item-details-container">
        <TabbedImageGallery
          images={this.state.item.images}
          itemId={this.state.item.id}
          title={this.state.item.title}
        />
        <div className="item-details-review-details-container">
          <div className="item-details-review-container">
            <AddReview itemId={this.state.item.itemId} />
          </div>
          <div className="item-details-details-container">
            <h1>{this.state.item.title}</h1>
            <Link
              className="item-details-link-to-seller"
              to={"/profile/" + this.state.item.userId}
            >
              Link to seller
            </Link>
            <p className="item-details-description">
              {this.state.item.details}
            </p>
            <fieldset>
              <dl>
                <dt>Price</dt>
                <dd>
                  $
                  {parseFloat(this.state.item.price).toLocaleString({
                    style: "currency"
                  })}
                </dd>
              </dl>
              <dl>
                <dt>In Stock</dt>
                <dd>{this.state.item.stock} available</dd>
              </dl>
            </fieldset>
            <AddToCart item={this.state.item} />
          </div>
        </div>
        <div className="item-details-reviews">
          <ReviewList itemId={this.state.item.itemId} />
        </div>
      </div>
    );
  }
}

let ItemDetails = connect()(UnconnectedItem);

export default withRouter(ItemDetails);
