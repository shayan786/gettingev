import React, { Component } from 'react';
import s from './styles.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const chargers = [
	{
		name: "Electrify America (EA)",
		image: "/images/chargers/ea.jpg",
		url: "https://www.electrifyamerica.com/locate-charger/",
		descirption: "Electrify America operates an electric vehicle DC fast charging network (owned by VW Group) in the United States, with more than 500 charging locations and over 2,200 individual charging units as of November 2020."
	},
	{
		name: "Tesla Superchargers",
		image: "/images/chargers/tesla.jpg",
		url: "https://www.tesla.com/supercharger",
		descirption: "With 20,000+ Superchargers, Tesla owns and operates the largest global, fast charging network in the world. (For Teslas)"
	},
	{
		name: "EVgo",
		image: "/images/chargers/evgo.png",
		url: "https://www.evgo.com/find-a-charger/",
		descirption: "EVgo is America's Largest Public Electric Vehicle (EV) Fast Charging Network. With more than 800 EV fast charging stations in 34 states."
	},
	{
		name: "GreenLots",
		image: "/images/chargers/greenlots.png",
		url: "https://charge.greenlots.com/evowner/portal/locate-charger",
		descirption: "Greenlots helps communities of all sizes and governments at every level prepare for the rapid introduction of electric vehicles, by deploying resilient EV charging."
	},
	{
		name: "PlugShare",
		image: "/images/chargers/plugshare.jpg",
		url: "https://www.plugshare.com/en",
		descirption: "Find EV charging stations with PlugShare's map of over 440000 electric vehicle charging stations! Charging tips, reviews and photos from the EV community."
	}
]

class ChargersPage extends Component {

  render() {
    return ( 
    	<div className={s.container}>
    		<div className={s.header}>
    			<h3> Getting EV - Chargers </h3>
    		</div>
    		<div className={s.cards}>
	    		{
	    			chargers.map((c, i) => 
	    				<Card className={s.card} key={i}>
	    					<CardMedia
				          className={s.image}
				          image={c.image}
				          title={s.name} />
					      <CardContent>
					        <Typography variant="h5" component="h2">
					          {c.name}
					        </Typography>
					        <Typography variant="body2" component="p">
					          {c.descirption}
					        </Typography>
					      </CardContent>
					      <CardActions>
					      	<a href={c.url} target="_blank" rel="noopener noreferrer">
					        	<Button size="small">Learn More</Button>
					        </a>
					      </CardActions>
					    </Card>
	    			)
	    		}
	    	</div>
   		</div>
    )
  }
}

export default ChargersPage;
