import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedItem extends Component {
  handleClick = () => {
    this.props.dispatch({
      type: "set-number",
      number: Math.floor(Math.random() * 1000)
    });
  };

  render = () => {
    return (
      <div>
        This is Item {this.props.match.params.id}!
        <button onClick={this.handleClick}>
          Random number: {this.props.randNum}
        </button>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    randNum: state.randomNumber
  };
};

let Item = connect(mapStateToProps)(UnconnectedItem);

export default Item;
