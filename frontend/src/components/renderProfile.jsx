import React, { Component } from "react";
import ReviewList from "./ReviewList.jsx";
import Item from "./Item.jsx";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount = () => {
    fetch("/get-items-by-user?userId=" + this.props.match.params.userId)
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        console.log(body);
        this.setState({
          items: body
        });
      });
  };

  itemHtml = () => {
    if (this.state.items.length === 0) {
      return <h3>There are no items on sale by this user.</h3>;
    } else {
      return (
        <div className="container">
          <p>All Items: </p>
          <div className="gallery">
            {/*items.map(item => (
          <Item
            cost={item.price}
            sellerId={item.sellerId}
            imageLocation={item.images[0]}
            description={item.description}
            itemId={item.id}
            key={item.id}
          />
        ))*/}
            Item list work in progress.
          </div>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div>
        {this.itemHtml()}
        <ReviewList userId={this.props.match.params.userId} />
      </div>
    );
  };
}

export default Profile;
