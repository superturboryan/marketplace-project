import React, { Component } from "react";
import { connect } from "react-redux";
import { initialItems } from "./../dummyData.js";
import Item from "./Item.jsx";
import "./../css/gallery.css";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div className="container">
        <p>All Items: </p>
        <div className="gallery">
          {initialItems.map(item => (
            <Item
              cost={item.price}
              sellerId={item.sellerId}
              imageLocation={item.images[0]}
              description={item.description}
              itemId={item.id}
            />
          ))}
        </div>
      </div>
    );
  };
}

let ItemGallery = connect()(UnconnectedApp);

export default ItemGallery;
