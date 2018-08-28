import React, { Component } from 'react';
import Calculate from '../CalculateSize/Calculate';
import howto from "../../icons/howto.gif";
import ruler from "../../icons/ruler-1.svg";
import compass from "../../icons/compass.svg";

class HowToMeasure extends Component {
    state = {
        showHowTo: true,
    }

    nextStep = () => {
        console.log('click')
        this.setState({showHowTo: false})
      }

    render(){
        return(
            <div>
                {this.state.showHowTo ? <div className="howTomeasure">
            <h1>Hur du mäter</h1>
            <img className="measure-gif" src={howto} alt="man" />
            <div className="measurements">
                <div className="child length">
                    <h3 className="measurements--text">Längd</h3>
                    <p>Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet</p>
                </div>
                <div className="child girth">
                    <h3 className="measurements--text">Omkrets</h3>
                    <p>Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet Lorem ipsum dolor sit amoet</p>
                </div>
            </div>
            <button onClick={this.nextStep} className="next Button">Nästa steg</button>
            
          </div> : <Calculate /> }
            
          </div>
        )
    }
}

export default HowToMeasure;
