import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Item from "./Item.jsx";
import "./../css/gallery.css";

class UnconnectedItemGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      reloadToggle: false
    };
  }

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
          this.setState({
            items: [],
            reloadToggle: !this.state.reloadToggle
          });
          return;
        }

        this.setState({
          items: body,
          reloadToggle: !this.state.reloadToggle
        });
      });
  };

  componentDidMount = () => {
    console.log("Component did mount. Query: ", this.getQuery());
    this.fetchItems();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.reloadToggle === this.state.reloadToggle) {
      console.log("reloadToggle did update.");
      this.fetchItems();
    }
  };

  getQuery = () => {
    //will get the item, from search term after the /
    let temp = this.props.location.pathname;
    return temp.substring(temp.lastIndexOf("/") + 1);
  };

  render = () => {
    return (
      <div className="galleryContainer">
        <div className="gallery">
          {this.state.items.map(item => (
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
