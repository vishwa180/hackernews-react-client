import React, { Suspense, Fragment } from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import NavBar from './components/layout/NavBar';

import { Spinner, ErrorBoundary, RouteComponent } from './components/common';

import routes from './routes';
import NotFound from './pages/NotFound';

export default function App() {
	return (
		<Fragment>
			<NavBar />
			<main className='flex-shrink-0'>
				<div className='container'>
					<Suspense fallback={<Spinner />}>
						<ErrorBoundary>
							<HashRouter>
								<Switch>
									{routes.map((route, idx) => (
										<RouteComponent key={idx} exact={true} path={route.path} component={route.component} />
									))}
									<RouteComponent component={NotFound} />
								</Switch>
							</HashRouter>
						</ErrorBoundary>
					</Suspense>
				</div>
			</main>
		</Fragment>
	);
}
