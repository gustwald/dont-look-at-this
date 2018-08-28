import React, { Component } from "react";
import {Popover} from 'antd';
import Loader from '../Loader/Loader';
import "../../scss/components/_Condoms.scss";

class Condoms extends Component {
  state = {
    girthValue: 0,
    lengthValue: 0
  };
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({ girthValue: newProps.girth, lengthValue: newProps.length });
  }

  render() {
    
    const condoms = this.props.returnedCondoms;
    // const minimumGirth = parseInt(this.state.girthValue[0] * 10);
    // const maximumGirth = parseInt(this.state.girthValue[1] * 10);
    const length = this.state.lengthValue * 10;
    const girth = this.state.girthValue * 10;
    console.log({girth, length})
    const items = condoms.filter(condom => parseInt(condom.condom_girth) >= girth && parseInt(condom.condom_length) >= length);
    // const items = condoms.filter(condom => {
    //   const g = parseInt(condom.condom_girth);
    //   const l = parseInt(condom.condom_length);
    //   return (g - 0.5 >= girth || g + 0.5 <= girth) && l >= length;
    //  })
     console.log(items);
    return (
      <div className="Condoms-container">
      <h1>Ditt resultat:</h1>
      <div className="Condoms">
      {/* <h1>Ditt resultat:</h1> */}
        {items.length !== 0 ? items.map((condom, i) => {
          return (
            <Popover content={<div key={i}>
              <h3>{condom.name.replace(" - Kondomer", "")}</h3>
              <p>Material: {condom.condom_material}</p>
              <p>Omkrets: {parseInt(condom.condom_girth) / 10 + 'cm'}</p>
              <p>Längd: {parseInt(condom.condom_length) / 10 + 'cm'}</p>
            </div>}>
            <a href={condom.url_key}>
            <div key={i} className="Condoms-child">
              
                {/* {condom.name.replace(" - Kondomer", "")} */}
             
              <div style={{ backgroundImage: `url(${condom.image})` }} className="Condoms-img">
                
              </div>
         
              {/* <p>Material: {condom.condom_material}</p>
              <p>Omkrets: {parseInt(condom.condom_girth) / 10 + 'cm'}</p>
              <p>Längd: {parseInt(condom.condom_length) / 10 + 'cm'}</p> */}
            </div>
            </a>
            </Popover>
          );
        }) : <Loader />}
        </div>
      </div>
    );
  }
}

export default Condoms;


