import React, { Component } from 'react';
import { Popover } from 'antd';
import Loader from '../Loader/Loader';
import { Menu, Dropdown, Icon, Select } from 'antd';

import '../../scss/components/_Condoms.scss';
import { Emoji } from 'emoji-mart';
const Option = Select.Option;

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
    this.setState({
      girthValue: newProps.girth,
      lengthValue: newProps.length,
      isFetching: false,
    });
  }
  handleChange = key => {
    if (key === 'latexfree') {
      this.setState({ material: 'latexfree', filter: 'Latexfree' });
    } else if (key === 'all') {
      this.setState({ material: '', filter: '' });
    } else if (key == 'thickness') {
      this.setState({ material: 'thickness', filter: 'thickness' });
    }
  };

  onClick = ({ key }) => {
    if (key === 'latexfree') {
      this.setState({ material: 'latexfree', filter: 'Latexfree' });
    } else if (key === 'all') {
      this.setState({ material: '', filter: '' });
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
    const windowWidth = window.innerWidth;
    console.log(windowWidth);
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
              <Dropdown
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
              </Dropdown>
              {/* <Select
                defaultValue="Filtrera på"
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                <Option value="thickness">Extra tunna</Option>
                <Option value="latexfree">Latexfria</Option>
                {material !== '' || feature !== '' ? (
                  <Option value="all">Nollställ filter</Option>
                ) : null}
              </Select> */}
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
