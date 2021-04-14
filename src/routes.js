import HomePage from './pages/home/index.js';
import ChargersPage from './pages/chargers/index.js';
import AboutPage from './pages/about/index.js';
import ReviewsPage from './pages/reviews/index.js';
import EvsesPage from './pages/evses/index.js';
import ResourcesPage from './pages/resources/index.js';
import SalesPage from './pages/sales/index.js';
import ChargingCurvesPage from './pages/chargingCurves/index.js';

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
		path: "/evses",
		exact: true,
		component: EvsesPage
	},
	{
		path: "/sales",
		exact: true,
		component: SalesPage
	},
	{
		path: "/charging-curves",
		exact: true,
		component: ChargingCurvesPage
	},
	{
		path: "/resources",
		exact: true,
		component: ResourcesPage
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