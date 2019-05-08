import React, { Component } from "react";
import ReviewList from "./ReviewList.jsx";
import { Link } from "react-router-dom";

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

  itemDetailsHtml = item => {
    return (
      <div className="galleryItem">
        <Link className="link1" to={"/item/" + item.itemId}>
          <div className="galleryItemDescription">{item.title}</div>
          <figure className="galleryImageContainer">
            <img
              className="gallery__img"
              alt=""
              height="100px"
              src={item.images[0]}
            />
          </figure>
          <div className="galleryItemCost">
            ${item.price.toLocaleString({ style: "currency" })}
          </div>
        </Link>
      </div>
    );
  };

  itemHtml = () => {
    if (this.state.items.length === 0) {
      return <h3>There are no items on sale by this user.</h3>;
    } else {
      return (
        <div>
          <h2>{this.state.items[0].user[0].username}</h2>
          <div className="container">
            <p>All Items: </p>
            <div className="gallery">
              {this.state.items.map(item => this.itemDetailsHtml(item))}
            </div>
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
