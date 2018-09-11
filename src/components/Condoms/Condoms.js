import React, { Component } from 'react';
import { Popover } from 'antd';
import Loader from '../Loader/Loader';
import { Menu, Dropdown, Icon } from 'antd';

import '../../scss/components/_Condoms.scss';
import { Emoji } from 'emoji-mart';

class Condoms extends Component {
  state = {
    girthValue: 0,
    lengthValue: 0,
    isFetching: true,
    material: '',
    feature: '',
    filter: '',
  };
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({
      girthValue: newProps.girth,
      lengthValue: newProps.length,
      isFetching: false,
    });
  }

  onClick = ({ key }) => {
    console.log(key);
    if (key === 'latexfree') {
      this.setState({ material: 'Latex', filter: 'Latexfree' });
    } else if (key === 'all') {
      this.setState({ material: '', filter: '' });
    } else if (key == 'thickness') {
      this.setState({ feature: 'Extra tunna', filter: 'thickness' });
    }
  };

  filter(filter) {
    switch (filter) {
      case 'Latexfree':
        return 'Latexfria';
      case 'thickness':
        return 'Extra tunna';
      default:
        return null;
    }
  }

  render() {
    const { material, feature, filter } = this.state;
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="thickness">Extra tunna</Menu.Item>
        <Menu.Item key="latexfree">Latexfria</Menu.Item>
        {material !== '' || feature !== '' ? (
          <Menu.Item key="all">Nollställ filter</Menu.Item>
        ) : null}
      </Menu>
    );
    const condoms = this.props.returnedCondoms;
    const girth = this.state.girthValue;
    // const items = condoms.filter(condom => parseInt(condom.condom_girth) >= girth );

    // const latexOnly = condoms.filter(condom => !condom.condom_materials.toLowerCase().contains('latex'));
    console.log(this.state.material);
    const removedLube = condoms.filter(condom => {
      console.log(girth);
      if (condom.condom_girth) {
        return condom;
      }
    });
    console.log(material);
    const items = removedLube
      .filter(condom => {
        const g = condom.condom_girth;
        const strippedG = g.replace(/\D/g, '');
        const parsedG = parseInt(strippedG) / 10;
        const totalG = girth + 0.4;
        if (parsedG < totalG && parsedG > girth) {
          return condom;
        }
      })
      .filter(condom => {
        if (material !== '' && condom.condom_materials === material) {
        } else {
          console.log('ingen filtrering');
          return condom;
        }
      })
      .filter(condom => {
        if (feature !== '' && condom.condom_features !== feature) {
        } else {
          return condom;
        }
      })
      .sort(
        (a, b) => parseInt(b.condom_marginal) - parseInt(a.condom_marginal),
      );

    console.log(items);
    return (
      <div className="Condoms-container">
        {this.state.isFetching ? null : (
          <div className="Condoms-menu">
            {items.length !== 0 ? <h1>Ditt resultat:</h1> : null}
            {items.length > 1 ? (
              <div>
                <Dropdown overlay={menu}>
                  <span className="ant-dropdown-link">
                    Filtrera på{' '}
                    <span style={{ color: '#d15bf1' }}>
                      {this.filter(filter)}
                    </span>
                    <Icon type="down" />
                  </span>
                </Dropdown>
              </div>
            ) : null}
          </div>
        )}

        <div className="Condoms">
          {/* <h1>Ditt resultat:</h1> */}
          {this.state.isFetching ? (
            <Loader />
          ) : items.length !== 0 ? (
            items.map((condom, i) => {
              return (
                <Popover
                  content={
                    <div key={i}>
                      <h3>{condom.name.replace(' - Kondomer', '')}</h3>
                      <p>Material: {condom.condom_materials}</p>
                      <p>
                        Omkrets: {parseInt(condom.condom_girth) / 10 + 'cm'}
                      </p>
                      <p>
                        Egenskaper:{' '}
                        {condom.condom_features.split(',').join(', ')}
                      </p>
                    </div>
                  }
                >
                  <a href={condom.url_key} target="_blank">
                    <div key={i} className="Condoms-child">
                      {/* {condom.name.replace(" - Kondomer", "")} */}

                      <img src={condom.image} className="Condoms-img" />

                      <div className="Condoms-child-mobile">
                        <p>Material: {condom.condom_materials}</p>
                        <p>
                          Omkrets: {parseInt(condom.condom_girth) / 10 + 'cm'}
                        </p>
                        <p>
                          Egenskaper:{' '}
                          {condom.condom_features.split(',').join(', ')}
                        </p>
                      </div>
                    </div>
                  </a>
                </Popover>
              );
            })
          ) : (
            <div className="notFound">
              <h2>
                Vi hittade inga kondomer som passade din kuk{' '}
                <Emoji
                  emoji={{ id: 'white_frowning_face', skin: 3 }}
                  size={24}
                />{' '}
              </h2>
              <p>
                Du är välkommen att <a href="/">försöka igen</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Condoms;
