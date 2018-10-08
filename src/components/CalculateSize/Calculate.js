import React, { Component, Fragment } from 'react';
import { Slider, InputNumber, Button, Steps } from 'antd';
import Condoms from '../Condoms/Condoms';
import kondomer from '../../condoms.json';
import Loader from '../Loader/Loader';
import ruler from '../../icons/ruler-1.svg';
import compass from '../../icons/compass.svg';
import width from '../../icons/measure-tool2-girth2.gif';
import length from '../../icons/measure-tool2-length2.gif';
import '../../scss/components/_Calculate.scss';

function formatter(value) {
  return `${value}cm`;
}

const Step = Steps.Step;

class Calculate extends Component {
  state = {
    girthValue: 6,
    lengthValue: 0,
    condoms: [],
    loading: false,
    current: 0,
    showCondoms: false,
    showCalculations: true,
  };

  calculate = () => {
    this.setState({
      loading: true,
      showCondoms: true,
      showCalculations: false,
    });

    const retCondoms = kondomer.rss.feed[0].Product;
    const values = retCondoms.map(condom => {
      const condomProps = {};
      for (let prop in condom) {
        condomProps[prop] = condom[prop][0];
      }
      return condomProps;
    });
    this.setState({ condoms: values, loading: false });
  };
  getEmoji = count => {
    if (count === 0) {
      return '\u{1F610}';
    }
    if (count <= 5) {
      return '\u{1F644}';
    } else if (count <= 10) {
      return '\u{1F605}';
    } else if (count <= 15) {
      return '\u{1F611}';
    } else if (count <= 20) {
      return '\u{1F60F}';
    } else if (count <= 25) {
      return '\u{1F635}';
    } else if (count <= 30) {
      return '\u{1F60D}';
    }
  };

  onGirthChange = value => {
    this.setState({
      girthValue: value,
    });
  };

  onLengthChange = value => {
    this.setState({
      lengthValue: value,
    });
  };

  onChange = value => {
    this.setState({
      girthValue: value,
    });
  };

  render() {
    const { current, steps, loading } = this.state;
    const emoji = this.getEmoji(this.state.lengthValue);
    return (
      <div>
        {this.state.showCalculations ? (
          <div className="Calculate" id="calculate">
            <div className="Calculate-condomSize-item">
              <p className="measureindex">
                Längd <img src={ruler} alt="length" />
              </p>
              <h1 className="numberindex">{`${this.state.lengthValue} cm`}</h1>
              <Slider
                min={0}
                max={30}
                onChange={this.onLengthChange}
                value={this.state.lengthValue}
                tipFormatter={formatter}
              />
            </div>
            <div className="Calculate-condomSize-item Calculate-condomSize-item--girth">
              <p className="measureindex">
                Omkrets <img src={compass} alt="girth" />
              </p>

              <h1 className="numberindex">
                {this.state.girthValue === 14
                  ? `${this.state.girthValue}+ cm`
                  : `${this.state.girthValue} cm`}
              </h1>
              <Slider
                min={6}
                max={14}
                value={this.state.girthValue}
                onChange={this.onChange}
                tipFormatter={formatter}
                step={0.2}
              />
              <div className="emoji">
                <span>{emoji}</span>
                {/* <Emoji emoji={{ id: emoji, skin: 3 }} size={64} /> */}
              </div>
              <button className="Button calculate" onClick={this.calculate}>
                Räkna ut
              </button>
            </div>
          </div>
        ) : null}
        {this.state.showCondoms ? (
          <Condoms
            returnedCondoms={this.state.condoms}
            girth={this.state.girthValue}
            length={this.state.lengthValue}
          />
        ) : null}
      </div>
    );
  }
}

export default Calculate;
