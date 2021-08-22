import { lazy } from 'react';

const routes = [
	{ path: '/', component: lazy(() => import('./pages/Home')) },
	{ path: '/users/:id', component: lazy(() => import('./pages/User')) },
];

export default routes;
