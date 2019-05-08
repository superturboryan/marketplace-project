import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogout extends Component {
  handleClick = () => {
    fetch("/logout", {
      method: "GET",
      credentials: "include"
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

        console.log(body);
        this.props.dispatch({
          type: "logged-in",
          toggle: false,
          username: ""
        });
      });
  };

  render = () => {
    return <button onClick={this.handleClick}>Logout</button>;
  };
}

let Logout = connect()(UnconnectedLogout);

export default Logout;
