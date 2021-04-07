import { Component } from "react";
import "../App.css";
class Cbutton extends Component {
  // if (this.props.isActive) {
  //   className += ' menu-active';
  // }

  handle_click = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.name);
    }
  };

  render() {
    let className = "Button";
    if (this.props.className) {
      className += ` ${this.props.className}`;
    }
    return (
      <button className={className} onClick={this.handle_click}>
        {/* <span charset="UTF-8"> */}
        {this.props.name}
        {/* </span> */}
      </button>
    );
  }
}

export default Cbutton;
