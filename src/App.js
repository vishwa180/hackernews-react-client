import React, { Suspense, Fragment } from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import NavBar from './components/layout/NavBar';

import ErrorBoundary from './components/common/ErrorBoundary';
import RouteComponent from './components/common/RouteComponent';

import { Spinner } from './components/common/Spinner';

import routes from './routes';

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
								</Switch>
							</HashRouter>
						</ErrorBoundary>
					</Suspense>
				</div>
			</main>
		</Fragment>
	);
}
