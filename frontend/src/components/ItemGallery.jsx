import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { initialItems } from "./../dummyData.js";
import Item from "./Item.jsx";
import "./../css/gallery.css";

let items = [];

class UnconnectedItemGallery extends Component {
  fetchItems = () => {
    // TO DO
    // Fetch -> pass result of this.getQuery() to body
    items = initialItems;

    let data = new FormData();
    data.append("query", this.getQuery());
    fetch("/get-all-items", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.stringify(responseBody);

        console.log(body);
        if (body === undefined) {
          items = [];
          return;
        }

        items = body;
      });
  };

  /*componentWillMount = () => {
    console.log("Query: ", this.getQuery());
    this.fetchItems();
  };

  componentDidUpdate = () => {
    console.log("Query: ", this.getQuery());
    this.fetchItems();
  };*/

  getQuery = () => {
    let temp = decodeURIComponent(this.props.location.pathname);
    return temp.substring(temp.lastIndexOf("/") + 1);
  };

  render = () => {
    // Since this component doesn't update often,
    // we can fetch here.
    this.fetchItems();

    return (
      <div className="container">
        <p>All Items: </p>
        <div className="gallery">
          {items.map(item => (
            <Item
              cost={item.price}
              sellerId={item.sellerId}
              imageLocation={item.images[0]}
              description={item.description}
              itemId={item.id}
            />
          ))}
        </div>
      </div>
    );
  };
}

let ItemGallery = connect()(UnconnectedItemGallery);

// withRouter is used so that the route path is
// passed to this prop via this.props.location
export default withRouter(ItemGallery);
