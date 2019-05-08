import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./../css/login.css";

class UnconnectedLogin extends Component {
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

    fetch("http://localhost:4000/login", {
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
            message: "Login not successful. Please try again"
          });
          return;
        }

        console.log(body);
        this.props.dispatch({
          type: "show-message",
          message: "Login successful!"
        });
        this.props.dispatch({
          type: "logged-in",
          toggle: true,
          username: parsedBody.username
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
      <div className={"standard-container"} id={"login-page-container"}>
        <h1 id={"loginPageTitle"}>Login</h1>
        <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <h4 className={"loginHeaderText"}>Username</h4>
          <input
            id={"usernameInputLogin"}
            type="text"
            onChange={this.handleUsername}
            value={this.state.username}
          />
          <h4 className={"loginHeaderText"}>Password</h4>
          <input
            id={"passwordInputLogin"}
            type="text"
            onChange={this.handlePassword}
            value={this.state.password}
          />
          <div>
            <input id={"submitLogin"} type="submit" value="Login" />
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

let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;
