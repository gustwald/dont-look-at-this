import React, { Component } from 'react';
import logo from '../../icons/condomsize_logo.jpg';

class Logo extends Component {
  state = {
    isLoaded: false,
  };

  render() {
    return (
      <div>
        <a href="/">
          <img src={logo} className="logo" />
        </a>
      </div>
    );
  }
}

export default Logo;
