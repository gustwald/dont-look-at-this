import React, { Component } from "react";
import {Popover} from 'antd';
import Loader from '../Loader/Loader';
import "../../scss/components/_Condoms.scss";
import { Emoji } from 'emoji-mart';

class Condoms extends Component {
  state = {
    girthValue: 0,
    lengthValue: 0,
    isFetching: true,
  };
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({ girthValue: newProps.girth, lengthValue: newProps.length,isFetching: false });
  }

  render() {
    
    const condoms = this.props.returnedCondoms;
    // const length = this.state.lengthValue;
    const girth = this.state.girthValue;
    // const items = condoms.filter(condom => parseInt(condom.condom_girth) >= girth );
    
    const removedLube = condoms.filter(condom => {
      console.log(girth);
      if(condom.condom_girth){

        //  const g = condom.condom_girth;
        //  const strippedG = g.replace(/\D/g,'');
        // const parsedG = parseInt(strippedG) / 10;

        // console.log(parsedG);

        // return (parsedG - 0.5 >= girth || parsedG + 0.5 <= girth);
        // return (girth <= (parsedG + 0.5) );
        return condom;
      }
      
     })

     const items = removedLube.filter(condom =>{
        const g = condom.condom_girth;
        const strippedG = g.replace(/\D/g,'');
        const parsedG = parseInt(strippedG) / 10;
        const totalG = girth + 1;
        if(parsedG < totalG && parsedG > girth ){
            return condom;
        }
     })
     console.log(items);
    return (
      <div className="Condoms-container">
      <h1>Ditt resultat:</h1>
      <div className="Condoms">
      {/* <h1>Ditt resultat:</h1> */}
      {this.state.isFetching ? <Loader /> : (items.length !== 0 ? items.map((condom, i) => {
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
        }) : <div className="notFound"><h2>Vi hittade inga kondomer som passade din kuk <Emoji emoji={{ id: 'white_frowning_face', skin: 3 }} size={24} /> </h2>
          <p>Du är välkommen att <a href="/">försöka igen</a>.</p>
        </div>)}
        </div>
      </div>
    );
  }
}

export default Condoms;


