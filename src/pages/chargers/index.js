import React, { Component } from 'react';
import s from './styles.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class ChargersPage extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	loading: true,
		// 	activeTab: 0
		// }
	}

  render() {
    return ( 
    	<div className={s.container}>
    		<h3> Chargers </h3>
   		</div>
    )
  }
}

export default ChargersPage;
