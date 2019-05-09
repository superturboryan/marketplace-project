import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "./ItemList.jsx";

class UnconnectedPayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      name: "",
      cv: "",
      expriMonth: "",
      expirYear: ""
    };
  }
  handlerCardNumber = event => {
    this.setState({ cardNumber: event.target.value });
  };
  handlerName = event => {
    this.setState({ name: event.target.value });
  };
  handlerCv = event => {
    this.setState({ cv: event.target.value });
  };
  handlerExpirationMonth = event => {
    this.setState({ expirMonth: event.target.value });
  };
  handlerExpirationYear = event => {
    this.setState({ expirYear: event.target.value });
  };
  render = () => {
    return (
      <form onSubmit={this.handlerSubmit}>
        <div>Credit card number</div>
        <input
          type={"text"}
          onChange={this.handlerCardNumber}
          value={this.state.cardNumber}
        />{" "}
        cvv
        <input type={"text"} onChange={this.handlerCv} value={this.state.cv} />
        <div>Full name</div>
        <input
          type={"text"}
          onChange={this.handlerName}
          value={this.state.name}
        />
        <div>Expiration</div>month
        <input
          type={"text"}
          onChange={this.handlerExpirationMonth}
          value={this.state.expirMonth}
        />
        Year
        <input
          type={"text"}
          onChange={this.handlerExpirationYear}
          value={this.state.expirYear}
        />
      </form>
    );
  };
}
let PayForm = connect()(UnconnectedPayForm);
export default PayForm;
