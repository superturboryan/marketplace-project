import React, { Component } from "react";
import { connect } from "react-redux";
import ItemGallery from "./ItemGallery.jsx";
import "./../css/gallery.css";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <p>All Items:</p>
        <ItemGallery />
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);

export default App;
