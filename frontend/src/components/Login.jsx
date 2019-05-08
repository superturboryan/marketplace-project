import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
         <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
               <div>Username</div>
               <input
                  type="text"
                  onChange={this.handleUsername}
                  value={this.state.username}
               />
               <div>Password</div>
               <input
                  type="text"
                  onChange={this.handlePassword}
                  value={this.state.password}
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
