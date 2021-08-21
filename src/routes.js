import { lazy } from 'react';

const routes = [{ path: '/', component: lazy(() => import('./pages/Home')) }];

export default routes;
