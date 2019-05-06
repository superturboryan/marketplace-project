import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // req.body.username
    // req.body.password
    let data = new FormData(event.target);
    console.log(event.target);

    fetch("/signup", {
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
        this.props.dispatch({
          type: "logged-in",
          toggle: true
        });
      });
  };

  handleUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render = () => {
    if (this.props.loggedIn) {
      return null; // TO DO: Point to the main page.
    }

    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <div>Username</div>
          <input
            type="text"
            onChange={this.handleUsername}
            value={this.state.username}
            name={"username"}
          />
          <div>Password</div>
          <input
            type="text"
            onChange={this.handlePassword}
            value={this.state.password}
            name={"password"}
          />
          <input type="submit" value="Submit" />
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

let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
