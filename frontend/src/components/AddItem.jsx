import React, { Component } from "react";
import { connect } from "react-redux";

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
      images: undefined
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("location", {
      city: this.state.city,
      province: this.state.province,
      country: this.state.country
    });
    data.append("images", this.state.images);
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
          return;
        }

        // TODO: Do stuff. Redirect?
        console.log(body);
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
        price: 0
      });
      return;
    }
    this.setState({
      price: result
    });
  };

  handleStock = event => {
    let result = parseFloat(event.target.value);
    if (isNaN(result)) {
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
  };

  render = () => {
    /*if (!this.props.loggedIn) {
      return null; // TO DO: Redirect to the main page if not logged int
    }*/

    return (
      <div>
        <h1>Sell Something!</h1>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <div>Title</div>
          <input
            type="text"
            onChange={this.handleTitle}
            value={this.state.title}
          />
          <div>Description</div>
          <input
            type="text"
            onChange={this.handleDescription}
            value={this.state.description}
          />
          <div>Price</div>
          <input
            type="number"
            onChange={this.handlePrice}
            value={this.state.price}
            min={0}
          />
          <div>How many in stock</div>
          <input
            type="number"
            onChange={this.handleStock}
            value={this.state.stock}
            min={1}
          />
          <div>
            <div>Location</div>
            <div>
              <div>City</div>
              <input
                type="text"
                onChange={this.handleCity}
                value={this.state.city}
              />
            </div>
            <div>
              <div>Province/State</div>
              <input
                type="text"
                onChange={this.handleProvince}
                value={this.state.province}
              />
            </div>
            <div>
              <div>Country</div>
              <input
                type="text"
                onChange={this.handleCountry}
                value={this.state.country}
              />
            </div>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={this.handleFiles}
              id="uploads"
              multiple
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
