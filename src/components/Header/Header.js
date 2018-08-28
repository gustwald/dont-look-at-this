import React, { Component } from "react";
import Nav from "./Nav";
import text from "../../utils/text";
import condom from "../../icons/condom.svg";
import "../../scss/components/_Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Header-hero">
          <h1 className="Header-hero-intro">{text.introText}</h1>
          <h2 className="Header-hero-subText">{text.subText}</h2>
          <a data-scroll href="#calculate">
            <div className="Button get-started">Kom igång</div>
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
