import React, { Component } from "react";
import ReviewList from "./ReviewList.jsx";
import { Link } from "react-router-dom";
import "./../css/profile.css";

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
            ${parseFloat(item.price).toLocaleString({ style: "currency" })}
          </div>
        </Link>
      </div>
    );
  };

  itemHtml = () => {
    if (this.state.items.length === 0) {
      return (
        <h3 className="profile-username">
          There are no items on sale by this user.
        </h3>
      );
    } else {
      return (
        <div className="profile-top-half">
          <div className="profile-user-details">
            <img className="avatar" src="/assets/default-user.png" />
            <h2 className="profile-username">
              {this.state.items[0].user[0].username}'s profile
            </h2>
          </div>
          <h3 className="profile-items-header">Items for sale</h3>
          <div className="container">
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
      <div className="profile-body">
        {this.itemHtml()}
        <hr />
        <ReviewList userId={this.props.match.params.userId} />
      </div>
    );
  };
}

export default Profile;
