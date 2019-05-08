import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Item from "./Item.jsx";
import "./../css/gallery.css";

let items = [];

class UnconnectedItemGallery extends Component {
  fetchItems = () => {
    // Fetch -> pass result of this.getQuery()
    fetch("/get-items?search=" + this.getQuery(), {
      credentials: "include"
    })
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        console.log(body);
        if (body === undefined) {
          items = [];
          return;
        }

        items = body;
        //console.log("*****************Whats in items: **********************");
        //console.log(items);
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
    //will get the item, from search term after the /
    let temp = this.props.location.pathname;
    return temp.substring(temp.lastIndexOf("/") + 1);
  };

  render = () => {
    // Since this component doesn't update often,
    // we can fetch here.
    this.fetchItems();
    console.log("*****************Whats in items: **********************");
    console.log(items);
    return (
      <div className="container">
        <div className="gallery">
          {items.map(item => (
            <Item
              cost={item.price}
              sellerId={item.userId}
              imageLocation={item.images[0]}
              description={item.title}
              itemId={item.itemId}
              key={item.itemId}
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
