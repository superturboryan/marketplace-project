import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";
import Searchbar from "./Searchbar.jsx";
import "./../css/navigationBar.css";

class UnconnectedNavigationBar extends Component {
   ifLoggedInDoThis = returnThis => {
      if (this.props.loggedIn) {
         return returnThis;
      }
   };

<<<<<<< HEAD
   getButtonHtml = () => {
      if (!this.props.loggedIn) {
         return (
            <div>
               <div>
                  <Link to={"/signup"}>Signup</Link>
               </div>
               <div>
                  <Link to={"/login"}>Login</Link>
               </div>
            </div>
         );
      }
   };

   getNavigationLinks = () => {
      return (
         <div className="navigation-flex link-area just-bottom">
            :
=======
  getSignupLogin = () => {
    if (!this.props.loggedIn) {
      return (
        <div className="toTheEnd">
          <div>
            <Link to={"/signup"}>Signup</Link>
          </div>
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      );
    }
  };

  getUserRelatedLinks = () => {
    return (
      <div className="toTheEnd navigation-unflex">
        <div>
          <span>{this.props.username + " |"}</span>
          <Link to={"/cart"}>My Cart</Link>
        </div>
        <div className="toTheEnd">
          <Link to={"/add-item"}>Sell Something!</Link>
        </div>
      </div>
    );
  };

  getNavigationLinks = () => {
    return (
      <div className="navigation-flex link-area just-bottom">
        Categories:
>>>>>>> 16438fad3a4a03399bd3e2ffce2d628123754e32
        <div>Clothing and Accessories</div>
            <div>Films and Music</div>
            <div>Home and Appliances</div>
            <div>Electronics</div>
            <div>Video Games</div>
         </div>
      );
   };

<<<<<<< HEAD
   render = () => {
      return (
         <div className="navigation-bar">
            <div className="navigation-flex">
               <div className="navigation-unflex">
                  <Link to={"/"}>Ali-Bae</Link>
               </div>
               <Searchbar />
               {this.getButtonHtml()}
               {this.ifLoggedInDoThis(
                  <div className="toTheEnd navigation-unflex">
                     <div>
                        <span>{this.props.username + " |"}</span>
                        <Link to={"/cart"}>My Cart</Link>
                     </div>
                     <Link className="toTheEnd" to={"/add-item"}>
                        Sell Something!
              </Link>
                  </div>
               )}
            </div>
            <div className="navigation-left-right">
               {this.getNavigationLinks()}
               {this.ifLoggedInDoThis(<Logout className="toTheEnd" />)}
            </div>
         </div>
      );
   };
=======
  render = () => {
    return (
      <div className="navigation-bar">
        <div className="navigation-flex">
          <div className="navigation-unflex">
            <Link to={"/"}>Ali-Bae</Link>
          </div>
          <Searchbar />
          {this.getSignupLogin()}
          {this.ifLoggedInDoThis(this.getUserRelatedLinks())}
        </div>
        <div className="navigation-left-right">
          {this.getNavigationLinks()}
          {this.ifLoggedInDoThis(<Logout className="toTheEnd" />)}
        </div>
      </div>
    );
  };
>>>>>>> 16438fad3a4a03399bd3e2ffce2d628123754e32
}

let mapStateToProps = state => {
   return {
      loggedIn: state.loggedIn,
      username: state.username
   };
};

let NavigationBar = connect(mapStateToProps)(UnconnectedNavigationBar);

export default NavigationBar;
