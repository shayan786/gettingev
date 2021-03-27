import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './reset.css';
import { routes } from './routes.js';
import { NavigationContextProvider } from './contexts/navigation.js';
import { CarsContextProvider } from './contexts/cars.js';
import { ReviewsContextProvider } from './contexts/reviews.js';
import { EvsesContextProvider } from './contexts/evses.js';
import Header from './components/Header/Header';
import ErrorPage from './pages/error/index.js';

class App extends Component {
	constructor(props) {
		super(props);

		this.bodyRef = React.createRef();
	}

	componentDidMount() {
		const bodyEl = this.bodyRef.current;

		bodyEl.style.height = `${window.innerHeight}px`;

		window.onresize = (e) => {
			bodyEl.style.height = `${window.innerHeight}px`;
		}
	}

  render() {
  	return (
	    <Router>
	    	<NavigationContextProvider>
		    	<CarsContextProvider>
		    		<ReviewsContextProvider>
		    			<EvsesContextProvider>
				    		<main className="body" ref={this.bodyRef}>
				    			<Header />
									<div className="container">
										<Switch>
											{
												routes.map((route, key) => (
													<Route
														key={key}
														path={route.path}
														exact={route.exact}
														component={route.component} />
												))
											}
											<Route component={ErrorPage} />
										</Switch>
									</div>
								</main>
							</EvsesContextProvider>
						</ReviewsContextProvider>
					</CarsContextProvider>
				</NavigationContextProvider>
	    </Router>
	  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
