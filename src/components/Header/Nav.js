import React, { Component } from "react";
import "../../scss/App.css";

class Nav extends Component {
  render() {
    return (
      <div className="Navigation">
        <ul className="Navigation-list">
          <li className="Navigation-list-item">Hem</li>
          <li className="Navigation-list-item">Räkna ut</li>
          <li className="Navigation-list-item">Annat</li>
        </ul>
      </div>
    )
  }
}

export default Nav;