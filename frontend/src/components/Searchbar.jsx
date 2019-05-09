import React, { Component } from "react";
import { Redirect } from "react-router";
import "./../css/searchbar.css";

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      redirect: false
    };
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      redirect: true
    });
  };

  onChangedText = event => {
    this.setState({
      input: event.target.value
    });
  };

  formattedInput = () => {
    // Encode the search input into a URI-safe input.
    // Must replace '%' with an underscore '_' or it will crash.
    return encodeURIComponent(this.state.input.replace(/%/gi, ""));
  };

  render = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
      return <Redirect to={"/search/" + this.formattedInput()} />;
    }

    return (
      <div id={"search-bar-div"} className="toTheEnd">
        <form onSubmit={this.onSubmit}>
          <input
            className="searchBar"
            type="text"
            onChange={this.onChangedText}
            value={this.state.input}
          />
          <input id={"search-bar-submit"} type="submit" value="Search" />
        </form>
      </div>
    );
  };
}

export default Searchbar;
