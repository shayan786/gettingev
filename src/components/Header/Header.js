import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './styles.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import { NavigationContextConsumer } from '../../contexts/navigation.js';
import * as cx from 'classnames';

class Header extends Component {

  _renderHeader(items, onChangeLocation) {
    return (
      <header className={s.container}>
        {
          items.map((item, index) =>
            <Tooltip key={index} title={item.title} placement="right">
              <Link
                to={item.url}
                className={cx(s.item, { [s.active]: item.active })}
                onClick={() => { onChangeLocation(item) }}>
                { item.icon }
              </Link>
            </Tooltip>
          )
        }
      </header>
    )
  }

  render() {
    return (
      <NavigationContextConsumer>
        {
          ({ items, onChangeLocation }) => { return this._renderHeader(items, onChangeLocation) }
        }
      </NavigationContextConsumer>
    )
  }
}

export default Header;