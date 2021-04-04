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
import Tooltip from '@material-ui/core/Tooltip';
import Image from 'material-ui-image';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

class DetailsPanel extends Component {
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }

  componentDidUpdate() {
    const containerEl = this.containerRef.current;

    if (containerEl)
      containerEl.style.height = `${window.innerHeight}px`;
  }

	_renderHeader (title, handleClose) {
		return (
			<div className={s.header}>
				<h3>{title}</h3>
        <Tooltip title="Close" placement="bottom">
  				<IconButton aria-label="delete" onClick={() => handleClose() }>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
			</div>
		)
	}

	_renderCarousel (car) {
    const imageStyle = {
      objectFit: 'contain'
    };

    const containerStyles = {
    }
		return (
			<Carousel className={s.carousel}>
      	{
      		car.images.map((image, index) => 
            <Image
              imageStyle={imageStyle}
              style={containerStyles}
              key={index}
              src={image.formats.medium ? `${api.url}${image.formats.medium.url}` : `${api.url}${image.formats.thumbnail.url}`} />)
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
      },
      {
        label: "Dimensions",
        value: car.dimensions
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
                {prop.value ? prop.value : '-'}
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
        label: "Size (kw)",
        value: car.battery
      },
      {
        label: "Efficiency (Wh/km)",
        value: car.efficiency
      },
      {
        label: "Charging (kw)",
        value: car.charging_kW
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
                {prop.value ? prop.value : '-'}
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
        label: "Drivetrain",
        value: car.drivetrain
      },
      {
        label: "Horsepower (hp)",
        value: car.hp
      },
      {
        label: "Torque (ft-lbs)",
        value: car.torque
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
                {prop.value ? prop.value : '-'}
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
        label: "Cargo (cu. ft)",
        value: car.cargo_ft3
      },
      {
        label: "Weight (lbs)",
        value: car.weight_lbs
      },
      {
        label: "Seating",
        value: car.seating
      },
      {
        label: "Ground Clearance (in)",
        value: car.ground_clearance
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
                {prop.value ? prop.value : '-'}
              </div>
            </ListItem>
          )
        }
      </List>
    )
  }

  _renderReviews (car) {
    return car.reviews.length > 0 ? (
      <List
        className={s.overall}
        subheader={
          <ListSubheader disableSticky={true}>
            Reviews
          </ListSubheader>
        }>
        {
          car.reviews.map((review, i) => 
            <ListItem className={s.listItem} key={i}>
              <div>
                {`${review.type}`}
              </div>
              <div>
                <Tooltip title="Open review" placement="bottom">
                  <a href={review.url} target="_blank">
                    <IconButton aria-label="Open review">
                      <ExitToAppOutlinedIcon fontSize="small" />
                    </IconButton>
                  </a>
                </Tooltip>
              </div>
            </ListItem>
          )
        }
      </List>
    ) : null
  }

  render() {
  	const { open, car, handleClose } = this.props;

    return open ? (
    	<Paper className={s.container} elevation={3} ref={this.containerRef}>
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
          <Divider />
          { this._renderReviews(car) }
    		</div>
    	</Paper>
    ) : null
  }
}

export default DetailsPanel