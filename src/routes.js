import HomePage from './pages/home/index.js';
import ChargersPage from './pages/chargers/index.js';
import AboutPage from './pages/about/index.js';
import ReviewsPage from './pages/reviews/index.js';

export const routes = [
	{
		path: "/",
		exact: true,
		component: HomePage
	},
	{
		path: "/chargers",
		exact: true,
		component: ChargersPage
	},
	{
		path: "/reviews",
		exact: true,
		component: ReviewsPage
	},
	{
		path: "/reviews/:id",
		exact: true,
		component: ReviewsPage
	},
	{
		path: "/about",
		exact: true,
		component: AboutPage
	},
	{
		path: "/:id",
		exact: true,
		component: HomePage
	},
	{
		path: "/compare/:cars",
		exact: true,
		component: HomePage
	}
];