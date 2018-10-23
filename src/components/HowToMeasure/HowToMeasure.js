import React, { Component } from 'react';
import Calculate from '../CalculateSize/Calculate';
import { Modal, Icon } from 'antd';
import howto from '../../icons/opti.mp4';
import howtogg from '../../icons/opti.ogv';
import howtomov from '../../icons/opti.mov';
import howToGirth from '../../icons/measure-tool2-girth2.gif';
import howToLength from '../../icons/measure-tool2-length2.gif';

import ruler from '../../icons/ruler-1.svg';
import compass from '../../icons/compass.svg';

class HowToMeasure extends Component {
  state = {
    showHowTo: true,
    showWidthModal: false,
    showGirthModal: false,
  };

  componentDidMount() {
    const video = document.getElementById('video');
    video.muted = 'muted';
  }
  showWidthModal = () => {
    this.setState({
      showWidthModal: true,
    });
  };
  showGirthModal = () => {
    this.setState({
      showGirthModal: true,
    });
  };
  handleLengthOk = e => {
    this.setState({
      showWidthModal: false,
    });
  };
  handleGirthOk = e => {
    this.setState({
      showGirthModal: false,
    });
  };
  handleWidthCancel = () => {
    this.setState({ showWidthModal: false });
  };
  handleGirthCancel = () => {
    this.setState({ showGirthModal: false });
  };
  nextStep = () => {
    this.setState({ showHowTo: false });
  };

  render() {
    return (
      <div>
        {this.state.showHowTo ? (
          <div className="howTomeasure">
            <h1>Hur du mäter</h1>
            <video
              id="video"
              className="measure-gif"
              loop
              autoPlay
              playsInline
              width="300"
              height="220"
              preload="auto"
            >
              <source src={howto} type="video/mp4" />
              <source src={howtogg} type="video/ogv" />
              <source src={howtomov} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="measurements">
              <div className="child length">
                <h3 className="measurements--text">
                  Längd{' '}
                  <span className="iconspan">
                    <Icon
                      type="info-circle"
                      onClick={this.showWidthModal}
                      className="howtospan"
                      style={{ fontSize: '16px' }}
                      onClick={this.showWidthModal}
                      theme="twoTone"
                      twoToneColor="#d15bf1"
                    />
                  </span>
                </h3>
                <p>
                  Mät från roten till toppen på snoppens ovansida (erigerad).
                  Använd linjal eller måttband.
                </p>
              </div>
              <div className="child girth">
                <h3 className="measurements--text">
                  Omkrets{' '}
                  <span className="iconspan">
                    <Icon
                      type="info-circle"
                      onClick={this.showWidthModal}
                      className="howtospan"
                      style={{ fontSize: '16px' }}
                      onClick={this.showGirthModal}
                      theme="twoTone"
                      twoToneColor="#d15bf1"
                    />
                  </span>
                </h3>
                <p>
                  Ta ett snöre och linda den runt den tjockaste delen av snoppen
                  (erigerad), mät sedan längden på snöret.
                </p>
              </div>
            </div>
            <button onClick={this.nextStep} className="next Button">
              Nästa steg
            </button>
          </div>
        ) : (
          <Calculate />
        )}
        <Modal
          centered={true}
          title="Hur du mäter din längd"
          visible={this.state.showWidthModal}
          onOk={this.handleLengthOk}
          onCancel={this.handleWidthCancel}
        >
          <img className="modalWidth" src={howToLength} alt="width" />
        </Modal>
        <Modal
          centered={true}
          title="Hur du mäter din omkrets"
          visible={this.state.showGirthModal}
          onOk={this.handleGirthOk}
          onCancel={this.handleGirthCancel}
        >
          <img className="modalWidth" src={howToGirth} alt="girth" />
        </Modal>
      </div>
    );
  }
}

export default HowToMeasure;
