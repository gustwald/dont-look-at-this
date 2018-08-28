import React, { Component } from 'react';
import Calculate from './components/CalculateSize/Calculate';
import { Button } from 'antd';
import { Emoji } from 'emoji-mart';
import measure from './icons/measure.svg';
import Header from './components/Header/Header';
import text from './utils/text.js';
import Logo from './components/Logo/Logo';
import HowToMeasure from './components/HowToMeasure/HowToMeasure';
import './scss/App.css';

class App extends Component {
  state = {
    showIntro: true,
    showSteps: false,
    logoLoaded: false,
  };

  componentDidMount() {
    const loader = document.querySelector('.spinner');
    loader.style.display = 'none';
  }

  showSteps = () => {
    this.setState({ showSteps: true, showIntro: false });      
  };

  render() {
    const { showIntro, showSteps, logoLoaded, introClass } = this.state;
    return (
      <div className="App">
        <Logo />
        {showIntro ? (
          <section className="container">
            <h1 className="introHeading">
              <span className="title">Hur stor</span>
              <span className="title">penis</span>
              <span className="title">har du?</span>
            </h1>
            {/* <div className="measure-container"> */}
            {/* <img
              onClick={this.showSteps}
              className="measure"
              src={measure}
              alt="measure"
            /> */}
            <h4 className="measure" onClick={this.showSteps}>Klicka här för att komma igång<Emoji emoji={{ id: 'eggplant'}} size={20} /></h4>
            {/* </div> */}
            {/* <img onClick={this.showSteps} className="measure" src={measure} alt="measure" /> */}
            {/* <h2>Gör vårt test och ta reda på vilken kondom som passar dig!</h2> */}
          </section>
        ) : null}
        {showSteps ? <HowToMeasure /> : null}
      </div>
    );
  }
}

export default App;
