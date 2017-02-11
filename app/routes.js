import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Survey from './containers/Survey';

export default (
	<Route path="/" component={Survey}>
		<IndexRoute component={Survey} />
		{/* <Route path="/about" component={About} /> */}
	</Route>
);
