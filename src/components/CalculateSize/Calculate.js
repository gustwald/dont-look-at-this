import React, { Component, Fragment } from "react";
import { Slider, InputNumber, Button, Steps } from "antd";
import Header from '../Header/Header';
import { Emoji } from 'emoji-mart';
import { callApi } from "../../utils/data";
import Condoms from "../Condoms/Condoms";
import Loader from '../Loader/Loader';
import text from "../../utils/text";
import ruler from "../../icons/ruler-1.svg";
import compass from "../../icons/compass.svg";
import width from "../../icons/measure-tool2-girth2.gif";
import length from "../../icons/measure-tool2-length2.gif";
import "../../scss/components/_Calculate.scss";

function formatter(value) {
  return `${value}cm`;
}

const Step = Steps.Step;

class Calculate extends Component {
  state = {
    girthValue: 0,
    lengthValue: 0,
    condoms: [],
    loading: false,
    current: 0,
    showCondoms: false,
    showCalculations: true,
  };

  calculate = () => {
    this.setState({ loading: true, showCondoms: true, showCalculations: false});
    const condoms = callApi();
    condoms.then(data => {
      const retCondoms = data.rss.feed[0].Product;
      const values = retCondoms.map(condom => {
        const condomProps = {};
        for (let prop in condom) {
          condomProps[prop] = condom[prop][0];
        }
        return condomProps;
      });
      this.setState({ condoms: values, loading: false });
      console.log(this.state.condoms);
    });
  };
 getEmoji = (count) => {
    if(count === 0){
      return 'neutral_face'
    }
    console.log(count)
    if(count <= 5) {
      return 'expressionless'
    } 
    else if(count <= 10) {
      return 'sweat_smile'
    }
    else if(count <= 15) {
      return 'face_with_rolling_eyes'
    }
    else if(count <= 20) {
      return 'smirk'
    }
    else if(count <= 25) {
      return 'open_mouth'
    }
    else if(count <= 30) {
      return 'heart_eyes'
    }
  }

  onGirthChange = value => {
    this.setState({
      girthValue: value
    });
  };

  onLengthChange = value => {
    this.setState({
      lengthValue: value,
    });
  };

  onChange = value => {
    this.setState({
      girthValue: value
    });
  };

  render() {
    const {current, steps, loading } = this.state;
    const emoji = this.getEmoji(this.state.lengthValue)
    return (
      <div>
        {this.state.showCalculations ? 
      (<div className="Calculate" id="calculate">
       <div className="Calculate-condomSize-item">
         
         <p>Längd <img src={ruler} alt="length" /></p>
        
             <Slider
               min={0}
               max={30}
               onChange={this.onLengthChange}
               value={this.state.lengthValue}
               tipFormatter={formatter}
             />
             <h1>{`${this.state.lengthValue} cm`}</h1>
       </div>
       <div className="Calculate-condomSize-item Calculate-condomSize-item--girth">
         
         <p>Omkrets <img src={compass} alt="girth" /></p>
        
             <Slider
               min={0}
               max={30}
               value={this.state.girthValue}
               onChange={this.onChange}
               tipFormatter={formatter}
             />
             <h1>{`${this.state.girthValue} cm`}</h1>
             <div className="emoji"><Emoji emoji={{ id: emoji, skin: 3 }} size={64} /></div>
             <button className="Button calculate" onClick={this.calculate}>Räkna ut</button>
       </div>
       
       </div>) : null }
      {this.state.showCondoms ?<Condoms
            returnedCondoms={this.state.condoms}
            girth={this.state.girthValue}
            length={this.state.lengthValue}
        /> : null }
      </div>
    )}}

export default Calculate;
