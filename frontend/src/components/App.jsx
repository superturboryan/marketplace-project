import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemGallery from "./ItemGallery.jsx";
import "./../css/gallery.css";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <ItemGallery />
        This is App!
        <div>
          <Link to={"/item/1234"}>To item id 1234</Link>
        </div>
        <div>
          <Link to={"/item/5678"}>To item id 5678</Link>
        </div>
        <div>
          <Link to={"/add-item"}>Add an item</Link>
        </div>
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);

export default App;
