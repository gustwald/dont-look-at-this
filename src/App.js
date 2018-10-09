import React, { Component } from 'react';
import anime from 'animejs';
import Calculate from './components/CalculateSize/Calculate';
import { Button } from 'antd';
import measure from './icons/measure.svg';
import insta from './icons/instagram.png';
import Logo from './components/Logo/Logo';
import HowToMeasure from './components/HowToMeasure/HowToMeasure';
import './scss/App.css';

class App extends Component {
  state = {
    showIntro: true,
    showSteps: false,
    logoLoaded: false,
    showUnderline: false,
  };
  componentDidMount() {
    anime
      .timeline({ loop: false })
      .add({
        targets: '.ml15 .word',
        scale: [14, 1],
        opacity: [0, 1],
        easing: 'easeOutCirc',
        duration: 800,
        delay: function(el, i) {
          return 300 * i;
        },
      })
      .add({
        targets: '.ml15',
        opacity: 1,
        duration: 200,
        easing: 'easeOutExpo',
        delay: 100,
        complete: () => {
          this.setState({ showUnderline: true });
        },
      });
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
            <h1 className="ml15">
              <span className="word">Hur</span>
              <span className="word">stor</span>
              <span className="word">penis</span>
              <span className="word">har</span>
              <span className="word">du?</span>
            </h1>
            {/* <h1 className="introHeading">
              <span className="title">Hur stor</span>
              <span className="title">snopp</span>
              <span className="title">har du?</span>
            </h1> */}

            <h4
              className="measure"
              style={{ opacity: this.state.showUnderline ? 1 : 0 }}
              onClick={this.showSteps}
            >
              Klicka här för att komma igång
              <span style={{ fontSize: '20px' }}>🍆</span>
            </h4>
          </section>
        ) : null}
        {showSteps ? <HowToMeasure /> : null}
        <div className="socials">
          <div
            className="fb-share-button"
            data-href="https://condomsizecalculator.com/"
            data-layout="button"
            data-size="small"
            data-mobile-iframe="true"
          >
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcondomsizecalculator.com%2F&amp;src=sdkpreparse"
              className="fb-xfbml-parse-ignore"
            >
              Dela
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
