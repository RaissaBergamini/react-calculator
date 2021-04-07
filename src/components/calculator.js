import React, { Component } from "react";
import Cbutton from "./button";
import Cdisplay from "./display";

class Calculator extends Component {
  constructor() {
    super();
    this.operator_list = ["+", "-", "x", "/"];
    this.complex_operators = ["x²", "√"];
    this.final_operators = ["c", "="];

    this.state = {
      first_value: "",
      second_value: "",
      operator: "",
      display: "0",
    };
  }

  execute_operation = (operator) => {
    console.log(
      `Doing operation ${this.state.first_value} ${this.state.operator} ${this.state.second_value}`
    );
    var result = Number(this.state.first_value);
    if (this.state.operator === "+") {
      result += Number(this.state.second_value);
    } else if (this.state.operator === "-") {
      result -= Number(this.state.second_value);
    } else if (this.state.operator === "/") {
      result /= Number(this.state.second_value);
    } else if (this.state.operator === "x") {
      result *= Number(this.state.second_value);
    }

    if (operator === "x²") {
      result = result ** 2;
    } else if (operator === "√") {
      result = Math.sqrt(result);
    }
    this.setState({
      first_value: result.toString(),
      second_value: "",
      operator: "",
      display: result.toString(),
    });
    console.log(`Result is ${result}`);
    return result;
  };

  update_display = (number) => {
    var new_number;

    if (this.state.operator === "") {
      if (number !== "." || this.state.first_value.indexOf(".") === -1) {
        new_number = this.state.first_value + number;
        this.setState({
          first_value: new_number,
          display: new_number,
        });
      }
    } else {
      if (number !== "." || this.state.second_value.indexOf(".") === -1) {
        new_number = this.state.second_value + number;
        this.setState({
          second_value: new_number,
          display: new_number,
        });
      }
    }
  };

  add_operation = (operator) => {
    var result;

    if (
      this.state.operator === "" &&
      this.operator_list.indexOf(operator) !== -1
    ) {
      this.setState({ operator: operator, display: this.state.second_value });
    } else if (this.final_operators.indexOf(operator) === -1) {
      if (this.complex_operators.indexOf(operator) !== -1) {
        this.execute_operation(operator);
      } else {
        this.execute_operation(this.state.operation);
        this.setState({ operator: operator });
      }
    } else if (operator === "=") {
      this.execute_operation(this.state.operator);
    } else if (operator === "x²") {
      if (this.state.operator !== "") {
        this.execute_operation(this.state.operator);
      }
      result = (Number(this.state.first_value) ** 2).toString();
      this.setState({
        first_value: result,
        display: result,
      });
    } else if (operator === "c") {
      if (this.state.second_value === 0) {
        this.setState({ first_value: "" });
      } else {
        this.setState({ second_value: "" });
      }
      this.setState({ display: "0" });
    } else if ((operator = "ce")) {
      this.setState({ first_value: "" });
      this.setState({ second_value: "" });
      this.setState({ operator: "" });
      this.setState({ display: "0" });
    }
  };

  render() {
    let number_buttons = [];
    let buttons = [];
    var operator;

    for (var i = 1; i <= 9; i++) {
      number_buttons.push(
        <Cbutton
          className="numbers-button"
          name={i}
          onClick={this.update_display}
        />
      );
    }
    number_buttons.push(
      <Cbutton
        name={0}
        className="numbers-button"
        onClick={this.update_display}
      />
    );
    number_buttons.push(
      <Cbutton
        name={"."}
        className="numbers-button"
        onClick={this.update_display}
      />
    );
    for (operator of this.operator_list) {
      buttons.push(
        <Cbutton
          name={operator}
          className="operators-button"
          onClick={this.add_operation}
        />
      );
    }
    for (operator of this.complex_operators) {
      buttons.push(
        <Cbutton
          name={operator}
          className="operators-button"
          onClick={this.add_operation}
        />
      );
    }
    for (operator of this.final_operators) {
      buttons.push(
        <Cbutton
          name={operator}
          className="operators-button"
          onClick={this.add_operation}
        />
      );
    }

    return (
      <div className="Calc">
        <Cdisplay value={this.state.display} />
        <div className="Body">
          <div className="Numbers">{number_buttons}</div>
          <div className="Operators">{buttons}</div>
        </div>
      </div>
    );
  }
}

export default Calculator;
