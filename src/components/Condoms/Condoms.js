import React, { Component } from 'react';
import { Popover } from 'antd';
import Loader from '../Loader/Loader';
import { Menu, Dropdown, Icon, Select } from 'antd';

import '../../scss/components/_Condoms.scss';
const Option = Select.Option;

class Condoms extends Component {
  state = {
    girthValue: 0,
    lengthValue: 0,
    isFetching: true,
    material: '',
    feature: '',
    filter: '',
    selected: 'Filtrera på',
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      girthValue: newProps.girth,
      lengthValue: newProps.length,
      isFetching: false,
    });
  }
  change = event => {
    this.setState({ selected: event.target.value });
    this.handleChange(event.target.value);
  };
  handleChange = key => {
    if (key === 'latexfree') {
      this.setState({ material: 'latexfree', filter: 'Latexfree' });
    } else if (key === 'all') {
      this.setState({ material: '', filter: '', selected: 'Filtrera på' });
    } else if (key == 'thickness') {
      this.setState({ material: 'thickness', filter: 'thickness' });
    }
  };

  onClick = ({ key }) => {
    if (key === 'latexfree') {
      this.setState({ material: 'latexfree', filter: 'Latexfree' });
    } else if (key === 'all') {
      this.setState({ material: '', filter: '', selected: 'Filtrera på' });
    } else if (key == 'thickness') {
      this.setState({ material: 'thickness', filter: 'thickness' });
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
    const girth = this.props.girth;
    const allItems = condoms
      .filter(condom => condom.condom_girth)
      .filter(condom => {
        const g = condom.condom_girth;
        const strippedG = g.replace(/\D/g, '');
        const parsedG = parseInt(strippedG) / 10;
        const totalG = girth + 0.4;
        if (parsedG < totalG && parsedG >= girth) {
          return true;
        }
        return false;
      });

    const items = allItems
      .filter(condom => {
        if (material === '') return true;
        else if (material === 'latexfree') {
          return condom.condom_materials !== 'Latex';
        } else if (material === 'thickness') {
          return condom.condom_features.includes('Extra tunna');
        }

        return false;
      })
      .sort(
        (a, b) => parseInt(b.condom_marginal) - parseInt(a.condom_marginal),
      );
    return (
      <div className="Condoms-container">
        <div className="Condoms-menu">
          {allItems.length !== 0 ? <h1>Ditt resultat:</h1> : null}
          {allItems.length !== 0 ? (
            <h3 className="youSearched">
              Dina mått: Omkrets: {this.props.girth}
              cm, Längd: {this.props.length}
              cm
            </h3>
          ) : null}
          {allItems.length > 1 ? (
            <div>
              {/* <Dropdown
                overlay={menu}
                placement="bottomLeft"
                trigger={['click']}
              >
                <span className="ant-dropdown-link">
                  Filtrera på{' '}
                  <span style={{ color: '#d15bf1' }}>
                    {this.filter(filter)}
                  </span>
                  <Icon type="down" />
                </span>
              </Dropdown> */}
              <select onChange={this.change} name="filterDd">
                <option
                  value=""
                  disabled={this.state.selected !== 'Filtrera på'}
                  value={this.state.selected}
                  selected={this.state.selected === 'Filtrera på'}
                >
                  Filtrera på
                </option>
                <option value="thickness">Extra tunna</option>
                <option value="latexfree">Latexfria</option>
                {material !== '' || feature !== '' ? (
                  <option value="all">Nollställ filter</option>
                ) : null}
              </select>
            </div>
          ) : null}
        </div>

        <div className="Condoms">
          {items.length !== 0 ? (
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
              <h2 className="emojinotfound">
                Vi hittade inga kondomer som passade din kuk <span>😢</span>{' '}
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
