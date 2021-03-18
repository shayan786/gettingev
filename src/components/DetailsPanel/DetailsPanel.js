import React, { Component } from 'react';
import s from './styles.module.css';
// import * as cx from 'classnames';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Carousel from 'react-material-ui-carousel';
import { api } from '../../utils/api.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

class DetailsPanel extends Component {
	_renderHeader (title, handleClose) {
		return (
			<div className={s.header}>
				<h3>{title}</h3>
				<IconButton aria-label="delete" onClick={() => handleClose() }>
          <CloseIcon fontSize="small" />
        </IconButton>
			</div>
		)
	}

	_renderCarousel (car) {
		return (
			<Carousel className={s.carousel}>
      	{
      		car.images.map((image, index) => <img className={s.image} key={index} src={image.formats.medium ? `${api.url}${image.formats.medium.url}` : `${api.url}${image.formats.thumbnail.url}`} />)
      	} 	     
      </Carousel>
		)
	}

  _renderOverall (car) {
    const overallMap = [
      {
        label: "Range (mi)",
        value: car.range
      },
      {
        label: "Battery (kw)",
        value: car.battery
      },
      {
        label: "0-60mph (s)",
        value: car.acceleration
      },
      {
        label: "Top Speed (mph)",
        value: car.top_speed
      }
    ];

    return (
      <List
        className={s.overall}
        subheader={
          <ListSubheader disableSticky={true}>
            Overall
          </ListSubheader>
        }>
        {
          overallMap.map((prop, i) => 
            <ListItem className={s.listItem} key={i}>
              <div>
                {prop.label}
              </div>
              <div>
                {prop.value}
              </div>
            </ListItem>
          )
        }
      </List>
    )
  }

  _renderBattery (car) {
    const overallMap = [
      {
        label: "Range (mi)",
        value: car.range
      },
      {
        label: "Battery (kw)",
        value: car.battery
      },
      {
        label: "0-60mph (s)",
        value: car.acceleration
      },
      {
        label: "Top Speed (mph)",
        value: car.top_speed
      }
    ];

    return (
      <List
        className={s.overall}
        subheader={
          <ListSubheader disableSticky={true}>
            Battery and Charging
          </ListSubheader>
        }>
        {
          overallMap.map((prop, i) => 
            <ListItem className={s.listItem} key={i}>
              <div>
                {prop.label}
              </div>
              <div>
                {prop.value}
              </div>
            </ListItem>
          )
        }
      </List>
    )
  }

  _renderPower (car) {
    const overallMap = [
      {
        label: "Range (mi)",
        value: car.range
      },
      {
        label: "Battery (kw)",
        value: car.battery
      },
      {
        label: "0-60mph (s)",
        value: car.acceleration
      },
      {
        label: "Top Speed (mph)",
        value: car.top_speed
      }
    ];

    return (
      <List
        className={s.overall}
        subheader={
          <ListSubheader disableSticky={true}>
            Powertrain
          </ListSubheader>
        }>
        {
          overallMap.map((prop, i) => 
            <ListItem className={s.listItem} key={i}>
              <div>
                {prop.label}
              </div>
              <div>
                {prop.value}
              </div>
            </ListItem>
          )
        }
      </List>
    )
  }

  _renderBody (car) {
    const overallMap = [
      {
        label: "Range (mi)",
        value: car.range
      },
      {
        label: "Battery (kw)",
        value: car.battery
      },
      {
        label: "0-60mph (s)",
        value: car.acceleration
      },
      {
        label: "Top Speed (mph)",
        value: car.top_speed
      }
    ];

    return (
      <List
        className={s.overall}
        subheader={
          <ListSubheader disableSticky={true}>
            Body and Chassis
          </ListSubheader>
        }>
        {
          overallMap.map((prop, i) => 
            <ListItem className={s.listItem} key={i}>
              <div>
                {prop.label}
              </div>
              <div>
                {prop.value}
              </div>
            </ListItem>
          )
        }
      </List>
    )
  }

  render() {
  	const { open, car, handleClose } = this.props;

    return open ? (
    	<Paper className={s.container} elevation={3}>
    		{ this._renderHeader(`${car.year} ${car.manufacturer} ${car.model} - ${car.trim}`, handleClose) }
    		<div className={s.body}>
    			{ this._renderCarousel(car) }
          { this._renderOverall(car) }
          <Divider />
          { this._renderBattery(car) }
          <Divider />
          { this._renderPower(car) }
          <Divider />
          { this._renderBody(car) }
    		</div>
    	</Paper>
    ) : null
  }
}

export default DetailsPanel