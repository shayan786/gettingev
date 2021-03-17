import React, { Component } from 'react';
import s from './styles.module.css';
// import * as cx from 'classnames';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Carousel from 'react-material-ui-carousel';
import { api } from '../../utils/api.js';

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

	_renderCarousel(car) {
		return (
			<Carousel>
      	{
      		car.images.map((image, index) => <img className={s.image} key={index} src={`${api.url}${image.formats.medium.url}`} />)
      	} 	     
      </Carousel>
		)
	}

  render() {
  	const { open, car, handleClose } = this.props;

    return open ? (
    	<Paper className={s.container} elevation={3}>
    		{ this._renderHeader(`${car.year} ${car.manufacturer} ${car.model} - ${car.trim}`, handleClose) }
    		<div className={s.body}>
    			{ this._renderCarousel(car) }
    		</div>
    	</Paper>
    ) : null
  }
}

export default DetailsPanel