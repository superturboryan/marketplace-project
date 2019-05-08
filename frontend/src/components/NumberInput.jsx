import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/NumberInput.css";

/*
this component is allow users to enter a number
it has:
    - a dec button
    - a number input html element
    - a inc button
the input html element value -> state of store -> numberInput opropert -> object -> property -> this.props.name

*/

class UnconnectedNumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.updateStoreValue(1);
  };
  componentWillUnmount = () => {
    this.props.dispatch({ type: "remove-number-input", name: this.props.name });
  };
  updateStoreValue = newValue => {
    if (newValue < 0) {
      newValue = 0;
    }
    this.props.dispatch({
      type: "change-number-input-value",
      name: this.props.name,
      value: newValue
    });
  };
  handlerIncValue = () => {
    let newValue = parseInt(this.props.allValues[this.props.name]) + 1;
    this.updateStoreValue(newValue);
  };
  handlerDecValue = () => {
    let newValue = this.props.allValues[this.props.name] - 1;
    this.updateStoreValue(newValue);
  };
  handlerValueOnChange = numberInput => {
    let newValue = numberInput.target.value;
    this.updateStoreValue(newValue);
  };
  handlerFocusValueInput = event => {
    event.target.select();
  };
  render = () => {
    return (
      <span>
        <button onClick={this.handlerDecValue}>-</button>
        <input
          id={"ValueNumberInput"}
          type={"number"}
          onChange={this.handlerValueOnChange}
          value={this.props.allValues[this.props.name]}
          onFocus={this.handlerFocusValueInput}
        />
        <button onClick={this.handlerIncValue}>+</button>
      </span>
    );
  };
}
let mapStateToProps = state => {
  return { allValues: state.numberInput };
};
let NumberInput = connect(mapStateToProps)(UnconnectedNumberInput);
export default NumberInput;
