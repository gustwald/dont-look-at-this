import React, { Component } from 'react';
import Calculate from './components/CalculateSize/Calculate';
import { Button } from 'antd';
import { Emoji } from 'emoji-mart';
import measure from './icons/measure.svg';
import insta from './icons/instagram.png';
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
              <span className="title">snopp</span>
              <span className="title">har du?</span>
            </h1>
            <h4 className="measure" onClick={this.showSteps}>Klicka här för att komma igång<Emoji emoji={{ id: 'eggplant'}} size={20} /></h4>
          </section>
        ) : null}
        {showSteps ? <HowToMeasure /> : null}
        <div class="socials">
<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Dela</a></div>
        <a href="#"><img class="insta" src={insta} alt="alt" /></a>
        </div>

      </div>
    );
  }
}

export default App;
