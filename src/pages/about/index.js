import React, { Component } from 'react';
import s from './styles.module.css';

class AboutPage extends Component {
  render() {
    return ( 
    	<div className={s.container}>
            <div className={s.header}>
    		  <h3> About </h3>
            </div>
            <div className={s.body}>
        		<p> 
        		{
        			"Created with <3 by Shy, Tim, and Sam. We are car enthusiasts, but more specifically EV enthusiasts and have had a hard time finding a decent website that aggregated EV information without all that advertising fluff."
        		}
        		</p>
        		<p> 
        		{
        			"This is an open source project! If you'd like to contribute / help out please reach out via github:"
        		}
        		</p>
        		<div className={s.github}>
        			<a href="https://github.com/shayan786/gettingev" target="_blank" rel="noopener noreferrer"> Github </a>
        		</div>
            </div>
   		</div>
    )
  }
}

export default AboutPage;
