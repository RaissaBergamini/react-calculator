import React, { Component } from "react";

class Cdisplay extends Component {
  render() {
    return (
      <div className="Display">
        <div className="bottomRight">{this.props.value}</div>
      </div>
    );
  }
}

export default Cdisplay;
