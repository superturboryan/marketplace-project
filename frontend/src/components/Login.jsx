import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(event.target);
    // TO DO: Fetch request -> set global 'loggedIn' state.
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
        <h1>Login</h1>
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

let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;