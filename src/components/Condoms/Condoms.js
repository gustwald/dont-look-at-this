import React, { Component } from "react";
import {Popover} from 'antd';
import Loader from '../Loader/Loader';
import { Menu, Dropdown, Icon } from 'antd';

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

   onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="thickness">Tunnhet</Menu.Item>
        <Menu.Item key="material">Latexfria</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    const condoms = this.props.returnedCondoms;
    const girth = this.state.girthValue;
    // const items = condoms.filter(condom => parseInt(condom.condom_girth) >= girth );

    // const latexOnly = condoms.filter(condom => !condom.condom_materials.toLowerCase().contains('latex'));

    const removedLube = condoms.filter(condom => {
      console.log(girth);
      if(condom.condom_girth){
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
    //  items = items.sort((a, b) => a - b);
     console.log(items);
    return (
      <div className="Condoms-container">
           { this.state.isFetching ? null : <div className="Condoms-menu">
      
          {items.length !== 0 ? <h1>Ditt resultat:</h1> : null}
          {items.length > 1 ? <div>
          <Dropdown overlay={menu}>
        <span className="ant-dropdown-link">
          Filtrera på <Icon type="down" />
        </span>
          </Dropdown>
          </div> : null}
          </div>}
      
      <div className="Condoms">
      {/* <h1>Ditt resultat:</h1> */}
      {this.state.isFetching ? <Loader /> : (items.length !== 0 ? items.map((condom, i) => {
          return (
            <Popover content={<div key={i}>
              <h3>{condom.name.replace(" - Kondomer", "")}</h3>
              <p>Material: {condom.condom_materials}</p>
              <p>Omkrets: {parseInt(condom.condom_girth) / 10 + 'cm'}</p>
              <p>Längd: {parseInt(condom.condom_length) / 10 + 'cm'}</p>
            </div>}>
            <a href={condom.url_key} target="_blank">
            <div key={i} className="Condoms-child">
              
                {/* {condom.name.replace(" - Kondomer", "")} */}
             
              <img src={condom.image} className="Condoms-img" />
              
      
              <div className="Condoms-child-mobile">
              <p>Material: {condom.condom_materials}</p>
              <p>Omkrets: {parseInt(condom.condom_girth) / 10 + 'cm'}</p>
              <p>Längd: {parseInt(condom.condom_length) / 10 + 'cm'}</p>
              <p>Tunnhet: {condom.condom_thickness}</p>
              </div>
      
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


