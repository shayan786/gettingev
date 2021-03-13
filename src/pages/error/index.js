import React, { Component } from 'react';
import s from './styles.module.css';
// import Icon from '../../components/Icon/Icon.js';

class ErrorPage extends Component {
  render() {
    return (
    	<div className={s.container}>
         <div
         	className={s.title}>
         	<strong> The page you are looking for does not exist! </strong>
         </div>
    	</div>
    );
  }
}

export default ErrorPage;