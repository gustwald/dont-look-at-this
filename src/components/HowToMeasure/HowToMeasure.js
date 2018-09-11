import React, { Component } from 'react';
import Calculate from '../CalculateSize/Calculate';
import { Modal, Icon } from 'antd';
import howto from '../../icons/howto.gif';

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
    console.log('click');
    this.setState({ showHowTo: false });
  };

  render() {
    return (
      <div>
        {this.state.showHowTo ? (
          <div className="howTomeasure">
            <h1>Hur du mäter</h1>
            <img className="measure-gif" src={howto} alt="man" />
            <div className="measurements">
              <div className="child length">
                <h3 className="measurements--text">
                  Längd{' '}
                  <Icon
                    type="info-circle"
                    onClick={this.showWidthModal}
                    className="howtospan"
                    style={{ fontSize: '16px' }}
                    onClick={this.showWidthModal}
                    theme="twoTone"
                    twoToneColor="#d15bf1"
                  />
                </h3>
                <p>
                  Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet Lorem
                  ipsum dolor sit amoet Lorem ipsum dolor sit amoet
                </p>
              </div>
              <div className="child girth">
                <h3 className="measurements--text">
                  Omkrets{' '}
                  <Icon
                    type="info-circle"
                    onClick={this.showWidthModal}
                    className="howtospan"
                    style={{ fontSize: '16px' }}
                    onClick={this.showGirthModal}
                    theme="twoTone"
                    twoToneColor="#d15bf1"
                  />
                </h3>
                <p>
                  Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet Lorem
                  ipsum dolor sit amoet Lorem ipsum dolor sit amoet
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
