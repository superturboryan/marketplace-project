import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Oops from "./Oops";

class UnconnectedAddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: 0,
      stock: 1,
      city: "",
      province: "",
      country: "",
      images: undefined,
      redirect: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("city", this.state.city);
    data.append("province", this.state.province);
    data.append("country", this.state.country);
    // data.append("images", this.state.images);
    for (let i = 0; i < this.state.images.length; i++) {
      data.append("images", this.state.images[i]);
    }

    console.log("First image: ", this.state.images[0]);
    console.log(data);

    fetch("/add-item", {
      method: "POST",
      credentials: "include",
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        if (!body.success) {
          console.log(body);
          this.props.dispatch({
            type: "show-message",
            message: "An error occurred."
          });
          return;
        }

        console.log(body);
        this.props.dispatch({
          type: "show-message",
          message: "Your item has been added!"
        });
        this.setState({
          redirect: true
        });
      });
  };

  handleTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  handlePrice = event => {
    let result = parseFloat(event.target.value);
    if (isNaN(result)) {
      this.setState({
        price: ""
      });
      return;
    }
    this.setState({
      price: result
    });
  };

  handleStock = event => {
    let result = parseInt(event.target.value);
    if (isNaN(result) || result === 0) {
      this.setState({
        stock: 1
      });
      return;
    }
    this.setState({
      stock: result
    });
  };

  handleCity = event => {
    this.setState({
      city: event.target.value
    });
  };

  handleProvince = event => {
    this.setState({
      province: event.target.value
    });
  };

  handleCountry = event => {
    this.setState({
      country: event.target.value
    });
  };

  handleFiles = event => {
    this.setState({
      images: event.target.files
    });
    console.log("Files to upload:", event.target.files);
  };

  render = () => {
    if (!this.props.loggedIn) {
      return <Oops message={"You're not signed in!"} />;
    }

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Sell Something!</h1>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <div>Title</div>
          <input
            type="text"
            onChange={this.handleTitle}
            value={this.state.title}
            required={true}
          />
          <div>Description</div>
          <input
            type="text"
            onChange={this.handleDescription}
            value={this.state.description}
            required={true}
          />
          <div>Price</div>
          <input
            type="number"
            onChange={this.handlePrice}
            value={this.state.price}
            min={0}
            step={0.01}
            required={true}
          />
          <div>How many in stock</div>
          <input
            type="number"
            onChange={this.handleStock}
            value={this.state.stock}
            min={1}
            required={true}
          />
          <div>
            <div>Location</div>
            <div>
              <div>City</div>
              <input
                type="text"
                onChange={this.handleCity}
                value={this.state.city}
                required={true}
              />
            </div>
            <div>
              <div>Province/State</div>
              <input
                type="text"
                onChange={this.handleProvince}
                value={this.state.province}
                required={true}
              />
            </div>
            <div>
              <div>Country</div>
              <input
                type="text"
                onChange={this.handleCountry}
                value={this.state.country}
                required={true}
              />
            </div>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={this.handleFiles}
              id="images"
              name="images"
              multiple
              required={true}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let AddItem = connect(mapStateToProps)(UnconnectedAddItem);

export default AddItem;
