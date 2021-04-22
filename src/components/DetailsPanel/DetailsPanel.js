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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, Label, ResponsiveContainer } from 'recharts';
import { chartColors, getChargingCurve} from '../../utils/helpers.js';
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

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
      objectFit: 'contain',
    };
    const containerStyles = {
      paddingTop: 'calc(40%)'
    };

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

  _renderChargingCurve (car, curve) {
    const data = getChargingCurve(car, [curve]);

    return (
      <List 
        subheader={
          <ListSubheader disableSticky={true}>
            Charging Curve
          </ListSubheader>}
        >
        <ResponsiveContainer width={"100%"} height={300}>
          <LineChart
            margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
            data={data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="soc">
              <Label
                value="SOC (%)"
                position="bottom"
                style={{ textAnchor: "middle" }} />
            </XAxis>
            <YAxis>
              <Label
                value="KW"
                position="left"
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <ReTooltip />
            <Line
              dataKey={`${car.manufacturer}_${car.model}_${car.trim}`}
              name={`${car.manufacturer} - ${car.model} (${car.trim})`}
              type="monotone"
              stroke={chartColors[0]}
              strokeWidth={2}
              activeDot={{ r: 8 }} />
            }
          </LineChart>
        </ResponsiveContainer>
      </List>
    )
  }

  _renderCost (car) {
    return (
      <List
        className={s.overall}
        dense={true}
        subheader={
          <ListSubheader disableSticky={true}>
            Approximate Cost
          </ListSubheader>
        }>
          <ListItem className={s.listItem}>
            <div>
              MSRP (USD)
            </div>
            <div>
              {car.price ? currencyFormatter.format(car.price) : '-'}
            </div>
          </ListItem>
          <ListItem className={s.listItem}>
            <div>
              Federal Incentive
            </div>
            <div>
              {currencyFormatter.format(car.tax_credit)}
            </div>
          </ListItem>
          <ListItem className={s.listItem}>
            <div>
              Tax, Title, Destination Fees
            </div>
            <div>
              {currencyFormatter.format(car.price*0.08 + 1100)}
            </div>
          </ListItem>
          <ListItem className={s.listItem__finalPrice}>
            <div>
              Total
            </div>
            <div>
              {car.price ? currencyFormatter.format(car.price - car.tax_credit + 1100 + car.price*0.08) : "?"}
            </div>
          </ListItem>
      </List>
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
        dense={true}
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
        dense={true}
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
        dense={true}
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
        dense={true}
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
        dense={true}
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
          { this._renderCost(car) }
          <Divider />
          { this._renderOverall(car) }
          <Divider />
          { this._renderBattery(car) }
          <Divider />
          { this._renderPower(car) }
          <Divider />
          { this._renderBody(car) }
          <Divider />
          { this._renderReviews(car) }
          { car.charging_curve && <Divider /> }
          { car.charging_curve && this._renderChargingCurve(car, car.charging_curve) }
    		</div>
    	</Paper>
    ) : null
  }
}

export default DetailsPanel