import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./../css/signup.css";
class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }

  componentWillReceiveProps = () => {
    this.setState({
      redirect: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // req.body.username
    // req.body.password
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    console.log(data);

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
          this.props.dispatch({
            type: "show-message",
            message:
              "Username not available, or an error occurred. Please try again"
          });
          return;
        }

        console.log(body);
        this.props.dispatch({
          type: "show-message",
          message: "Signup successful!"
        });
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
    if (this.props.loggedIn || this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={"standard-container"}>
        <h1 id={"signupPageTitle"}>Signup</h1>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <h4 className={"signupHeaderText"}>Username</h4>
          <input
            id={"usernameInputSignup"}
            type="text"
            onChange={this.handleUsername}
            value={this.state.username}
            name={"username"}
          />
          <h4 className={"signupHeaderText"}>Password</h4>
          <input
            id={"passwordInputSignup"}
            type="text"
            onChange={this.handlePassword}
            value={this.state.password}
            name={"password"}
          />
          <div>
            <input id={"submitSignup"} type="submit" value="Sign up" />
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

let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
