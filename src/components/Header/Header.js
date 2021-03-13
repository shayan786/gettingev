import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './styles.module.css';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const navigation = [
  {
    title: "Home",
    url: "/",
    icon: <HomeOutlinedIcon />
  },
  {
    title: "Charging Locations",
    url: "/chargers",
    icon: <EvStationOutlinedIcon />
  },
  {
    title: "Reviews",
    url: "reviews",
    icon: <RateReviewOutlinedIcon />
  },
  {
    title: "About",
    url: "about",
    icon: <InfoOutlinedIcon />
  }
];

class Header extends Component {
  render() {
    return (
      <header className={s.container}>
        {
          navigation.map((item, index) =>
            <Tooltip key={index} title={item.title} placement="right">
              <Link
                to={item.url}
                className={s.item}>
                { item.icon }
              </Link>
            </Tooltip>
          )
        }
      </header>
    )
  }
}

export default Header