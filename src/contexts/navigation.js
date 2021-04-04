import React, { Component } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined';
import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

const NavigationContext = React.createContext();

const NAV_ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: <img src="/images/logo/gev.svg" />,
    active: true
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    active: false
  },
  {
    title: "Charging Locations",
    url: "/chargers",
    icon: <EvStationOutlinedIcon />,
    active: false
  },
  {
    title: "EVSEs / Chargers",
    url: "/evses",
    icon: <PowerOutlinedIcon />,
    active: false
  },
  {
    title: "Resources",
    url: "/resources",
    icon: <LibraryBooksOutlinedIcon />,
    active: false
  },
  {
    title: "About",
    url: "/about",
    icon: <InfoOutlinedIcon />,
    active: false
  }
];

export class NavigationContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: NAV_ITEMS
    }
  }

  componentDidMount() {
    const pathname =  window.location.pathname.split('/')[1];
    const path = (pathname.length === 1 || Number.isInteger(parseInt(pathname))) ? "" : pathname;
    let primaryNavItem = this.state.items.find(i => i.url === `/${path}`);

    this._onChangeLocation(primaryNavItem);
  }

  _onChangeLocation(item) {
    let tempItems = this.state.items;

    tempItems.forEach(i => {
      i.active = false;

      if (i.title === item.title)
        i.active = true
    })

    this.setState({
      items: tempItems
    })
  }

  render() {
    const { children } = this.props;
    const { items } = this.state;
    const activeItemName = items.find(i => i.active).title || null;

    document.title = activeItemName ? `Getting EV - ${activeItemName}` : "Getting EV";

    return (
      <NavigationContext.Provider 
        value={{
          items: items,
          onChangeLocation: (item) => { this._onChangeLocation(item) },
        }}>
        { children }
      </NavigationContext.Provider>
    );
  }
}

export const NavigationContextConsumer = NavigationContext.Consumer;